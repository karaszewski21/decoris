import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ClientService } from "../../../core/services/client/client.service";
import { Store } from "@ngrx/store";
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
import { GetClients, getCountries } from "../../store";
import { ClientDialogComponent } from "../../components/dialog/client-dialog/client-dialog.component";
import { GetParameters } from "../../store/actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, OnDestroy {
  subscriptionCountries: Subscription;
  countries$ = this.store.select(getCountries);

  constructor(
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    let name: string[] = [];
    let business_profiles: string[] = [];
    let voivodeships: string[] = [];
    let cities: string[] = [];
    let countries: string[] = ["Polska"];

    let request = {
      limit: 10,
      offset: 0,
      name: name,
      business_profiles: business_profiles,
      voivodeships: voivodeships,
      cities: cities,
      countries: countries,
    };
    this.store.dispatch(new GetParameters({ loading: true }));
    this.store.dispatch(new GetClients({ loading: true }));
    this.store.dispatch(new SetFilters(request));

    // this.clientService.getClients(request).subscribe((companies) => {
    //   console.log(companies);
    // });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscriptionCountries.unsubscribe();
  }

  openNewClientModal() {
    this.subscriptionCountries = this.countries$.subscribe((countries) =>
      // console.log(countries)
      {
        console.log(countries);
        const dialogRef = this.dialog.open(ClientDialogComponent, {
          data: {
            title: "Nowy klient",
            company: {},
            countries: countries,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
        });
      }
    );
  }

  openUpdateClientModal() {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: "Nowy klient",
        company: {
          name: "Elo",
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
