import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ClientService } from "../../../core/services/client/client.service";
import { Store, select } from "@ngrx/store";
import { SetFilters } from "../../../core/store";
import { MatDialog } from "@angular/material/dialog";
import {
  GetClients,
  getCountries,
  getBusinessProfiles,
  getVoivodeships,
  getParametersLoading,
  getCities,
  getClients,
  getClientsLoading,
} from "../../../core/store";

import { GetParameters, GetCitiesByCountry } from "../../../core/store";
import { Subscription, merge } from "rxjs";
import { map } from "rxjs/operators";
import { CountryEnum } from "../../../core/enums/client/countries";
import { ClientDialogComponent } from "../client-dialog/client-dialog.component";
import { Company, City, Voivodeship } from "../../../interfaces/client";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, OnDestroy {
  filterRequest: any;
  totalCountCompanyPaginator: number;
  pageSizePaginator: number;
  pageSizeOptionsPaginator: number[];

  clients: Company[];
  filterList: Map<string, any[]> = new Map();
  subscriptionParameters: Subscription;
  subscriptionClients: Subscription;

  nameCompanyFilterControl: FormControl;
  businessProfilesFilterControl: FormControl;
  citiesFilterControl: FormControl;
  voivedeshipsFilterControl: FormControl;

  getParametersLoading$ = this.store.select(getParametersLoading);
  getClientsLoading$ = this.store.select(getClientsLoading);

  clientList$ = this.store.pipe(select(getClients));

  countries$ = this.store.pipe(
    select(getCountries),
    map((countries) => {
      return { key: "countries", list: countries };
    })
  );

  voivodeships$ = this.store.pipe(
    select(getVoivodeships),
    map((voivodeships) => {
      return { key: "voivodeships", list: voivodeships };
    })
  );

  cities$ = this.store.pipe(
    select(getCities),
    map((cities) => {
      return { key: "cities", list: cities };
    })
  );

  businessProfiles$ = this.store.pipe(
    select(getBusinessProfiles),
    map((businessProfiles) => {
      return {
        key: "businessProfiles",
        list: businessProfiles,
      };
    })
  );

  constructor(
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filterRequest = {
      limit: 10,
      offset: 0,
      name: [],
      business_profiles: [],
      voivodeships: [],
      cities: [],
      countries: ["Polska"],
    };

    this.initControls();
    this.initParametersPaginator();
  }
  ngOnDestroy(): void {
    this.subscriptionParameters.unsubscribe();
    this.subscriptionClients.unsubscribe();
    this.filterRequest = {};
  }

  initControls() {
    this.nameCompanyFilterControl = new FormControl();
    this.businessProfilesFilterControl = new FormControl();
    this.citiesFilterControl = new FormControl();
    this.voivedeshipsFilterControl = new FormControl();
  }

  initParametersPaginator() {
    this.pageSizeOptionsPaginator = [5, 10, 25, 100];
    this.totalCountCompanyPaginator = 5;
    this.pageSizePaginator = 5;
  }
  getFilterList() {
    this.store.dispatch(new GetParameters({ loading: true }));
    this.store.dispatch(
      new GetCitiesByCountry({ loading: true, countriesIds: [1] })
    );
    this.spinner.show();
    this.getParametersLoading$.subscribe((loading) => {
      if (!loading) {
        this.subscriptionParameters = merge(
          this.countries$,
          this.voivodeships$,
          this.businessProfiles$,
          this.cities$
        ).subscribe((value) => {
          this.filterList.set(value.key, value.list);

          this.spinner.hide();
        });
      }
    });
  }

  getCompanyList() {
    this.store.dispatch(new GetClients({ loading: true }));
    this.store.dispatch(new SetFilters(this.filterRequest));
    this.spinner.show();

    this.getClientsLoading$.subscribe((loading) => {
      if (!loading) {
        this.subscriptionClients = this.clientList$.subscribe((clients) => {
          this.clients = clients;
          this.spinner.hide();
        });
      }
    });
  }

  selectedMarket(nameMarket) {
    let countries;
    switch (nameMarket) {
      case "polish":
        countries = this.filterList
          .get("countries")
          .filter((value) => value.name === CountryEnum.polish)
          .map((value) => value.name);

        this.store.dispatch(
          new SetFilters({
            ...this.filterRequest,
            countries,
          })
        );
        this.store.dispatch(
          new GetCitiesByCountry({ loading: true, countriesIds: [1] })
        );
        break;

      case "foreign":
        countries = this.filterList
          .get("countries")
          .filter((value) => value.name !== CountryEnum.polish)
          .map((value) => value.name);

        this.store.dispatch(
          new SetFilters({ ...this.filterRequest, countries })
        );
        this.store.dispatch(
          new GetCitiesByCountry({ loading: true, countriesIds: [2, 3] })
        );
        break;

      case "all":
        countries = this.filterList.get("countries").map((value) => value.name);

        this.store.dispatch(
          new SetFilters({ ...this.filterRequest, countries })
        );
        this.store.dispatch(
          new GetCitiesByCountry({ loading: true, countriesIds: [1, 2, 3] })
        );
        break;

      default:
        break;
    }
  }

  openNewClientModal() {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: "Nowy klient",
        company: null,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.clientService.addClient(result).subscribe((value) => {
          this.getCompanyList();
          this.spinner.hide();
        });
      }
    });
  }

  openUpdateClientModal(company) {
    this.spinner.show();
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: company.name,
        company: company,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.clientService.updateClient(result).subscribe((value) => {
          this.getCompanyList();
          this.spinner.hide();
        });
      }
    });
  }

  deleteClient(companyId) {
    this.spinner.show();
    console.log(companyId);
    this.clientService.deleteClient(companyId).subscribe((value) => {
      console.log(value);
      this.getCompanyList();
      this.spinner.hide();
    });
  }

  selectedCitiesFilter(selectedCities: City[]): void {
    if (selectedCities.length === 0) {
      this.resetFilter();
    } else {
      this.filterList.set(
        "voivodeships",
        selectedCities.map((city) => city.voivodeship)
      );
    }
  }
  selectedVoivedeshipsFilter(selectedVoivedeships: Voivodeship[]): void {
    if (selectedVoivedeships.length === 0) {
      this.resetFilter();
    } else {
      let selectedNameVoivedeships = selectedVoivedeships.map(
        (voivedeship) => voivedeship.name
      );
      this.filterList.set(
        "cities",
        [...this.filterList.get("cities")].filter((city) => {
          let cityBelongToVoivedeship = selectedNameVoivedeships.includes(
            city.voivodeship.name
          );

          if (cityBelongToVoivedeship) {
            return city;
          }
        })
      );
    }
  }

  resetFilter(): void {
    this.getParametersLoading$.subscribe((loading) => {
      if (!loading) {
        merge(this.voivodeships$, this.cities$).subscribe((value) => {
          this.filterList.set(value.key, value.list);

          this.spinner.hide();
        });
      }
    });
  }

  startFilter() {
    console.log(this.businessProfilesFilterControl.value);
    console.log(this.citiesFilterControl.value);
    console.log(this.voivedeshipsFilterControl.value);

    this.filterRequest = {
      limit: 10,
      offset: 0,
      name: [],
      business_profiles:
        this.businessProfilesFilterControl.value === null
          ? []
          : this.businessProfilesFilterControl.value.map(
              (businessProfiles) => businessProfiles.name
            ),
      cities:
        this.citiesFilterControl.value === null
          ? []
          : this.citiesFilterControl.value.map((cities) => cities.name),
      voivodeships:
        this.voivedeshipsFilterControl.value === null
          ? []
          : this.voivedeshipsFilterControl.value.map(
              (voivedeships) => voivedeships.name
            ),
      countries: ["Polska"],
    };

    console.log(this.filterRequest);

    this.getCompanyList();
  }

  selectedNameCompanyFilter(name) {
    console.log(name);

    if (name !== "") {
      this.filterRequest = {
        limit: 10,
        offset: 0,
        name: [name],
        business_profiles: [],
        voivodeships: [],
        cities: [],
        countries: ["Polska"],
      };
      this.getCompanyList();
    } else {
      this.filterRequest = {
        limit: 10,
        offset: 0,
        name: [],
        business_profiles: [],
        voivodeships: [],
        cities: [],
        countries: ["Polska"],
      };
      this.getCompanyList();
    }
  }
  paginator(paginatorInfo) {
    this.filterRequest = {
      ...this.filterRequest,
      limit: paginatorInfo.pageSize,
      offset:
        paginatorInfo.pageSize * paginatorInfo.pageIndex -
        paginatorInfo.pageSize,
    };

    console.log(this.filterRequest);
    console.log(paginatorInfo);
    this.getCompanyList();
  }
}
