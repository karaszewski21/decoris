import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "./core/services/account/account.service";
import { MatDialog } from "@angular/material/dialog";
import { MenuModalComponent } from "./shared/components/mobile/menu-modal/menu-modal.component";
import { User } from "./interfaces/account/user";
import { Store } from "@ngrx/store";
import { getAccount, getUser, getLoadingAccount, LogoutAccount } from "./store";
import { Subscription, merge } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuEnum } from "./core/enums/shared/menu";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadingAccountSubscription$: Subscription;
  accountSubscription$: Subscription;

  user: User = null;
  mobileMode: boolean;
  title = "decoris";
  hide = true;

  account$ = this.store.select(getAccount);
  user$ = this.store.select(getUser);
  loadingAccount$ = this.store.select(getLoadingAccount);

  constructor(
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.accountSubscription$ = this.user$.subscribe((user) => {
      this.accountService.setUserToLocalStorage(user);
      this.user = user;
      this.hide = true;
      this.router.navigate(["/client"]);
    });
  }

  ngOnDestroy(): void {
    this.loadingAccountSubscription$.unsubscribe();
    this.accountSubscription$.unsubscribe();
  }

  logout() {
    this.store.dispatch(new LogoutAccount({ logout: true }));
    this.accountService.logout();
  }

  navigator(route) {
    this.router.navigate([route]);
  }
  openMenu() {
    let menuDialog = this.dialog.open(MenuModalComponent);
    menuDialog.afterClosed().subscribe((result: MenuEnum) => {
      switch (result) {
        case MenuEnum.settings:
          this.router.navigate(["/setting"]);
          break;
        case MenuEnum.logout:
          this.logout();
          break;

        default:
          return;
      }
    });
  }
}
