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
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  BusinessProfile,
  Voivodeship,
  City,
  Country,
  Company,
  Employee,
  PositionEmployee,
} from "../../../interfaces/client";
import {
  GetClients,
  getCountries,
  getBusinessProfiles,
  getVoivodeships,
  getParametersLoading,
  getAluminiumProfiles,
  getAluminiumFittings,
  getPcvProfiles,
  getPcvFittings,
} from "../../store";

import {
  GetParameters,
  ParametersActionTypes,
  GetCitiesByCountry,
} from "../../store/actions";
import { Subscription, merge } from "rxjs";
import { map } from "rxjs/operators";
import { CountryEnum } from "../../../core/enums/client/countries";
import { ClientDialogComponent } from "../client-dialog/client-dialog.component";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, OnDestroy {
  filterRequest: any;
  parameters: Map<string, any[]> = new Map();
  subscriptionParametrs: Subscription;

  getParametersLoading$ = this.store.select(getParametersLoading);

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

  businessProfiles$ = this.store.pipe(
    select(getBusinessProfiles),
    map((businessProfiles) => {
      return {
        key: "businessProfiles",
        list: businessProfiles,
      };
    })
  );

  aluminiumProfiles$ = this.store.pipe(
    select(getAluminiumProfiles),
    map((aluminiumProfiles) => {
      return {
        key: "aluminiumProfiles",
        list: aluminiumProfiles,
      };
    })
  );

  aluminiumFittings$ = this.store.pipe(
    select(getAluminiumFittings),
    map((aluminiumFittings) => {
      return {
        key: "aluminiumFittings",
        list: aluminiumFittings,
      };
    })
  );

  pcvProfiles$ = this.store.pipe(
    select(getPcvProfiles),
    map((pcvProfiles) => {
      return {
        key: "pcvProfiles",
        list: pcvProfiles,
      };
    })
  );

  pcvFittings$ = this.store.pipe(
    select(getPcvFittings),
    map((pcvFittings) => {
      return { key: "pcvFittings", list: pcvFittings };
    })
  );

  constructor(
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.filterRequest = {
      limit: 10,
      offset: 0,
      name: [],
      business_profiles: [],
      voivodeships: [],
      cities: [],
      countries: ["Polska"],
    };

    this.store.dispatch(new SetFilters(this.filterRequest));
    this.store.dispatch(new GetParameters({ loading: true }));
    this.store.dispatch(new GetClients({ loading: true }));
    this.store.dispatch(
      new GetCitiesByCountry({ loading: true, countriesIds: [1] })
    );

    this.getParametersLoading$.subscribe((loading) => {
      if (!loading) {
        this.subscriptionParametrs = merge(
          this.countries$,
          this.voivodeships$,
          this.businessProfiles$,
          this.aluminiumProfiles$,
          this.aluminiumFittings$,
          this.pcvProfiles$,
          this.pcvFittings$
        ).subscribe((value) => {
          this.parameters.set(value.key, value.list);

          this.spinner.hide();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionParametrs.unsubscribe();
    this.filterRequest = {};
  }

  selectedMarket(nameMarket) {
    let countries;
    switch (nameMarket) {
      case "polish":
        countries = this.parameters
          .get("countries")
          .filter((value) => value.name === CountryEnum.polish)
          .map((value) => value.name);

        this.store.dispatch(
          new SetFilters({ ...this.filterRequest, countries })
        );
        this.store.dispatch(
          new GetCitiesByCountry({ loading: true, countriesIds: [1] })
        );
        break;

      case "foreign":
        countries = this.parameters
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
        countries = this.parameters.get("countries").map((value) => value.name);

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
        company: {},
        parameters: this.parameters,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  selectedCitiesByCompany() {}

  openUpdateClientModal() {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: "Nowy klient",
        company: {},
        parameters: this.parameters,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
