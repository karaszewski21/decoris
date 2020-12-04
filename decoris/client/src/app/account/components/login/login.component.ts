import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AccountService } from "../../../core/services/account/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @Output() loginEvent = new EventEmitter();
  hide = true;
  constructor() {}

  ngOnInit(): void {}

  login() {
    console.log("login");
    this.loginEvent.emit({ login: "karas", password: "1234" });
  }
}
