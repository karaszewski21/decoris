import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-client-form-fittings-profiles",
  templateUrl: "./client-form-fittings-profiles.component.html",
  styleUrls: ["./client-form-fittings-profiles.component.scss"],
})
export class ClientFormFittingsProfilesComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
