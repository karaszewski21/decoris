import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "./core/services/account/account.service";
import { MediaObserver } from "@angular/flex-layout";
import { MatDialog } from "@angular/material/dialog";
import { MenuModalComponent } from "./shared/components/mobile/menu-modal/menu-modal.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  mobileMode: boolean;
  title = "decoris";
  hide = true;

  constructor(
    private accountService: AccountService,
    private router: Router,
    public media: MediaObserver,
    private dialog: MatDialog
  ) {
    // if (this.accountService.isAuthenticated()) {
    //   this.router.navigate["/"];
    // } else {
    // this.router.navigate(["/account/login"]);
    // }
  }

  logout() {
    this.accountService.logout();
  }

  navigator(route) {
    this.router.navigate([route]);
  }
  openMenu() {
    this.dialog.open(MenuModalComponent);
  }
  isAuthenticated() {
    return true ?? this.accountService.isAuthenticated();
  }
}
