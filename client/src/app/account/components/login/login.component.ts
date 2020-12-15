import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AccountService } from "../../../core/services/account/account.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @Input() loginFormGroup: FormGroup;
  @Output() loginEvent = new EventEmitter();
  hide = true;
  constructor() {}

  ngOnInit(): void {}

  login() {
    this.loginEvent.emit();
  }
}
