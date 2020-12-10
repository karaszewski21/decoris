import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ClientService } from "../../../core/services/client/client.service";
import { Store, select } from "@ngrx/store";
import {
  SetFilters,
  FiltersActionTypes,
  getCountClients,
  ExportClients,
} from "../../../core/store";
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
import { Subscription, merge, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { CountryEnum } from "../../../core/enums/client/countries";
import { ClientDialogComponent } from "../client-dialog/client-dialog.component";
import {
  Company,
  City,
  Voivodeship,
  Country,
} from "../../../interfaces/client";
import { MediaObserver } from "@angular/flex-layout";
import { FormControl } from "@angular/forms";
import { ClientEmployeesModalComponent } from "../../components/dialog/information/client-employees-modal/client-employees-modal.component";
import { ClientNotesModalComponent } from "../../components/dialog/information/client-notes-modal/client-notes-modal.component";
import { ClientProfilesFittingsModalComponent } from "../../components/dialog/information/client-profiles-fittings-modal/client-profiles-fittings-modal.component";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Filter } from "../../../interfaces/client/filter";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  globalFilter: Filter;
  currentSelectedMarket: string;

  totalCountCompanyPaginator: number;
  pageSizePaginator: number;
  pageSizeOptionsPaginator: number[];
  resetPaginator: boolean;

  clients: Company[];
  filterList: Map<string, any[]> = new Map();
  subscriptionParameters: Subscription;
  subscriptionClients: Subscription;

  enableVoivodeshipsFilterControl: boolean;
  nameCompanyFilterControl: FormControl;
  businessProfilesFilterControl: FormControl;
  citiesFilterControl: FormControl;
  voivodeshipsFilterControl: FormControl;

  getClientsLoading$ = this.store.select(getClientsLoading);
  getParametersLoading$ = this.store.select(getParametersLoading);

  clientList$ = this.store.pipe(select(getClients));
  countClients$ = this.store.pipe(select(getCountClients));

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
    private dialog: MatDialog,
    public media: MediaObserver,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentSelectedMarket = CountryEnum.polish;

    this.globalFilter = {
      limit: 0,
      offset: 0,
      name: [],
      business_profiles: [],
      voivodeships: [],
      cities: [],
      country: CountryEnum.polish,
    };

    this.initControls();
    this.initParametersPaginator();
    this.getCompanyList();
    this.enableVoivodeshipsFilterControl = true;
  }
  ngOnDestroy(): void {
    this.subscriptionParameters.unsubscribe();
    this.subscriptionClients.unsubscribe();
    this.globalFilter = null;
  }

  initControls() {
    this.nameCompanyFilterControl = new FormControl();
    this.businessProfilesFilterControl = new FormControl();
    this.citiesFilterControl = new FormControl();
    this.voivodeshipsFilterControl = new FormControl();
  }

  initParametersPaginator() {
    this.countClients$.subscribe((totalCount) => {
      this.pageSizeOptionsPaginator = [10, 25, 100, 200, 500];
      this.totalCountCompanyPaginator = totalCount;
      this.pageSizePaginator = 10;
      this.globalFilter = {
        ...this.globalFilter,
        limit: this.pageSizePaginator,
      };
    });
  }

  getParametersList() {
    this.store.dispatch(new GetParameters({ loading: true }));

    this.spinner.show();
    this.getClientsLoading$.subscribe((loading) => {
      if (!loading) {
        this.subscriptionParameters = merge(
          this.countries$,
          this.voivodeships$,
          this.businessProfiles$
        ).subscribe((value) => {
          this.filterList.set(value.key, value.list);

          this.spinner.hide();
        });
      }
    });
  }

  getCityByCountries(name: string) {
    this.spinner.show();
    if (name == CountryEnum.polish) {
      this.store.dispatch(
        new GetCitiesByCountry({
          loading: true,
          countriesIds: [1],
        })
      );
    } else if (name == CountryEnum.foreign) {
      this.store.dispatch(
        new GetCitiesByCountry({
          loading: true,
          countriesIds: [0],
        })
      );
    } else if (name == CountryEnum.all) {
      this.store.dispatch(
        new GetCitiesByCountry({
          loading: true,
          countriesIds: [2],
        })
      );
    }

    this.cities$.subscribe((value) => {
      this.filterList.set(value.key, value.list);

      this.spinner.hide();
    });
  }

  getCompanyList() {
    this.spinner.show();
    let { country } = this.globalFilter;

    this.store.dispatch(
      new GetClients({ loading: true, filter: this.globalFilter })
    );
    this.getParametersList();
    this.getCityByCountries(country);

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
    switch (nameMarket) {
      case CountryEnum.polish:
        this.currentSelectedMarket = CountryEnum.polish;
        this.globalFilter = {
          ...this.globalFilter,
          country: CountryEnum.polish,
        };

        this.enableVoivodeshipsFilterControl = true;
        this.getCompanyList();

        break;
      case CountryEnum.foreign:
        this.currentSelectedMarket = CountryEnum.foreign;
        this.globalFilter = {
          ...this.globalFilter,
          country: CountryEnum.foreign,
        };

        this.enableVoivodeshipsFilterControl = false;
        this.getCompanyList();

        break;
      case CountryEnum.all:
        this.currentSelectedMarket = CountryEnum.all;

        this.globalFilter = {
          ...this.globalFilter,
          country: CountryEnum.all,
        };

        this.enableVoivodeshipsFilterControl = false;
        this.getCompanyList();

        break;
      default:
        break;
    }
  }

  openNewClientModal() {
    this.spinner.show();
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: "Nowy klient",
        company: null,
      },
    });
    this.spinner.hide();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.clientService.addClient(result).subscribe((value) => {
          if (value.companies[0].countries == CountryEnum.polish) {
            this.selectedMarket(CountryEnum.polish);
          } else {
            this.selectedMarket(CountryEnum.polish);
          }
          this.spinner.hide();
          this.openSnackBar(
            `Klient ${value.companies[0].name} zostal dodany`,
            "Ok"
          );
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
    this.spinner.hide();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.clientService.updateClient(result).subscribe((value) => {
          if (value.companies[0].countries == CountryEnum.polish) {
            this.selectedMarket(CountryEnum.polish);
          } else {
            this.selectedMarket(CountryEnum.polish);
          }
          this.spinner.hide();
          this.openSnackBar(
            `Klient ${value.companies[0].name} zostal zmieniony`,
            "Ok"
          );
        });
      }
    });
  }

  deleteClient(companyId) {
    this.spinner.show();
    of(companyId)
      .pipe(switchMap((id) => this.clientService.deleteClient(id)))
      .subscribe((value) => {
        this.getCompanyList();
        this.spinner.hide();
        this.openSnackBar(`Klient ${value.name} zostal zmieniony`, "Ok");
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
    if (selectedVoivedeships === null) {
      return;
    }

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
            city.voivodeship?.name
          );
          if (cityBelongToVoivedeship) {
            return city;
          }
        })
      );
    }
  }

  paginator(paginatorInfo) {
    this.globalFilter = {
      ...this.globalFilter,
      limit: paginatorInfo.pageSize,
      offset: paginatorInfo.pageSize * paginatorInfo.pageIndex,
    };

    this.getCompanyList();
  }

  resetFilter(): void {
    this.globalFilter = {
      ...this.globalFilter,
      limit: 10,
      offset: 0,
      name: [],
      business_profiles: [],
      cities: [],
      voivodeships: [],
      country: this.currentSelectedMarket,
    };
  }

  startFilter() {
    switch (this.currentSelectedMarket) {
      case CountryEnum.polish:
        this.globalFilter = {
          ...this.globalFilter,
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
            this.voivodeshipsFilterControl.value === null
              ? []
              : this.voivodeshipsFilterControl.value.map(
                  (voivedeships) => voivedeships.name
                ),
          country: CountryEnum.polish,
        };
        break;
      case CountryEnum.foreign:
        this.globalFilter = {
          ...this.globalFilter,
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
          voivodeships: [],
          country: CountryEnum.foreign,
        };
        break;
      case CountryEnum.all:
        this.globalFilter = {
          ...this.globalFilter,
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
          country: CountryEnum.all,
        };
        break;
      default:
        break;
    }

    let isEmpty =
      this.globalFilter.business_profiles.length !== 0 ||
      this.globalFilter.cities.length !== 0 ||
      this.globalFilter.voivodeships.length !== 0;

    if (!isEmpty) {
      this.openSnackBar("Nie wybrano filtra", "Ok");
      return;
    }

    this.getCompanyList();
    this.resetPaginator = true;
  }

  selectedNameCompanyFilter(name) {
    switch (this.currentSelectedMarket) {
      case CountryEnum.polish:
        this.globalFilter = {
          ...this.globalFilter,
          name: [name],
        };
        break;
      case CountryEnum.foreign:
        this.globalFilter = {
          ...this.globalFilter,
          name: [name],
        };
        break;
      case CountryEnum.all:
        this.globalFilter = {
          ...this.globalFilter,
          name: [name],
        };
        break;
      default:
        break;
    }

    this.getCompanyList();
    this.resetPaginator = true;
  }

  openNotesModal(notes) {
    this.dialog.open(ClientNotesModalComponent, {
      data: {
        notes: notes,
      },
    });
  }

  openEmployeesModal(employees) {
    this.dialog.open(ClientEmployeesModalComponent, {
      data: {
        employees: employees,
      },
    });
  }

  openProfilesAndFittingsModal(values) {
    let {
      aluminium_profiles,
      aluminium_fittings,
      pcv_profiles,
      pcv_fittings,
    } = values;
    this.dialog.open(ClientProfilesFittingsModalComponent, {
      data: {
        aluminiumProfiles: aluminium_profiles,
        aluminiumFittings: aluminium_fittings,
        pcvProfiles: pcv_profiles,
        pcvFittings: pcv_fittings,
      },
    });
  }

  openSnackBar(message, button) {
    this.snackBar.open(message, button, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  exportClients(type) {
    this.spinner.show();
    this.store.dispatch(new ExportClients({ loading: true, type: type }));

    this.getClientsLoading$.subscribe((value) => {
      this.spinner.hide();
    });
  }
}
