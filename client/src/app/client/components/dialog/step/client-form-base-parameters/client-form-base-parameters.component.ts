import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-client-form-base-parameters",
  templateUrl: "./client-form-base-parameters.component.html",
  styleUrls: ["./client-form-base-parameters.component.scss"],
})
export class ClientFormBaseParametersComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
