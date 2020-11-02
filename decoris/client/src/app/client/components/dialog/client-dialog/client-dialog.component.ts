import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

interface MarketGroup {
  name: string;
  country: string[];
}

@Component({
  selector: "app-client-dialog",
  templateUrl: "./client-dialog.component.html",
  styleUrls: ["./client-dialog.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ClientDialogComponent implements OnInit {
  isLinear = false;
  baseParametersCompanyFormGroup: FormGroup;
  locationCompanyFormGroup: FormGroup;

  countryControl: FormControl;

  marketGroup: MarketGroup[] = [
    {
      name: "Rynek polski",
      country: ["Polska"],
    },
    {
      name: "Rynek zagraniczny",
      country: ["Cypr", "Serbia"],
    },
  ];
  // cityGroup: MarketGroup[] = [
  //   {
  //     name: "Miasta",
  //     city: [""],
  //   },
  //   {
  //     name: "Rynek zagraniczny",
  //     country: ["Cypr", "Serbia"],
  //   },
  // ];

  voivodeships: string[] = ["Pomorskie", "Mazowieckie"];

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _companyFormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let { tilte, company, countries } = this.data;

    this.baseParametersCompanyFormGroup = this._companyFormBuilder.group({
      name: [company.name ?? "", Validators.required],
      nip: [company.nip ?? ""],
      mail: [company.mail ?? "", Validators.email],
      web_page: [company.web_page ?? ""],
    });

    this.countryControl = new FormControl();

    this.locationCompanyFormGroup = this._companyFormBuilder.group({
      address: [company.address ?? ""],
      post_code: [company.post_code ?? ""],
      phone_number: [company.phone_number ?? ""],
    });

    // this.locationCompanyFormGroup = this._companyFormBuilder.group({
    //   address: ["", Validators.required],
    //   post_code: ["", Validators.required],
    // });

    this.countryControl.valueChanges.subscribe((value) => console.log(value));
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSaveAndCloseClick() {
    this.dialogRef.close(this.data);
  }
}
