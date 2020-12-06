import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../core/services/account/account.service";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  loginControl: FormControl;
  passwordControl: FormControl;
  constructor(private router: Router, private accountService: AccountService) {}

  login() {
    this.accountService.login(
      this.loginControl.value,
      this.passwordControl.value
    );
  }
  ngOnInit(): void {
    this.initControls();
  }
  initControls() {
    this.loginControl = new FormControl("", Validators.required);
    this.passwordControl = new FormControl("", Validators.required);
  }
}
