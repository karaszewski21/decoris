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
import { SetFilters } from "../../store/actions/filtersAction";
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
} from "../../store";

import { GetParameters, GetCitiesByCountry } from "../../store/actions";
import { Subscription, merge } from "rxjs";
import { map } from "rxjs/operators";
import { CountryEnum } from "../../../core/enums/client/countries";
import { ClientDialogComponent } from "../client-dialog/client-dialog.component";
import { Company } from "../../../interfaces/client";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, OnDestroy {
  filterRequest: any;
  clients: Company[];
  filterList: Map<string, any[]> = new Map();
  subscriptionParameters: Subscription;
  subscriptionClients: Subscription;

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

    //this.store.dispatch(new SetFilters(this.filterRequest));
    // this.store.dispatch(new GetParameters({ loading: true }));
    //   this.store.dispatch(new GetClients({ loading: true }));
    // this.store.dispatch(
    //   new GetCitiesByCountry({ loading: true, countriesIds: [1] })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptionParameters.unsubscribe();
    this.subscriptionClients.unsubscribe();
    this.filterRequest = {};
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
          console.log(this.clients);
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
      this.spinner.show();
      this.clientService.addClient(result).subscribe((value) => {
        this.spinner.hide();
      });
    });
  }

  selectedCitiesByCompany() {}

  openUpdateClientModal() {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: "Nowy klient",
        company: {},
        parameters: this.filterList,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.spinner.show();
      console.log(result);
      // this.clientService.addClient(result);
      this.spinner.hide();
    });
  }
}
