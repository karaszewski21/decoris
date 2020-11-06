import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-client-form-business-profile",
  templateUrl: "./client-form-business-profile.component.html",
  styleUrls: ["./client-form-business-profile.component.scss"],
})
export class ClientFormBusinessProfileComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
