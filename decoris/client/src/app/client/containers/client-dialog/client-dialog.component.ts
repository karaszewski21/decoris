import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { CountryEnum } from "../../../core/enums/client/countries";
import {
  Note,
  Employee,
  Country,
  City,
  Voivodeship,
} from "../../../interfaces/client";
import { v4 as uuidv4 } from "uuid";
import { Store, select } from "@ngrx/store";
import {
  getCities,
  getParametersLoading,
  GetCitiesByCountry,
} from "../../store";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client-dialog",
  templateUrl: "./client-dialog.component.html",
  styleUrls: ["./client-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ClientDialogComponent implements OnInit, OnDestroy {
  isLinear = false;
  currentDateTime = new Date();
  subscriptionParameters$: Subscription;
  getParametersLoading$ = this.store.select(getParametersLoading);

  baseParametersCompanyFormGroup: FormGroup;
  locationCompanyFormGroup: FormGroup;
  businessProfileCompanyFormGroup: FormGroup;
  fittingsProfilessFormGroup: FormGroup;
  employeesCompanyFormGroup: FormGroup;
  notesCompanyFormGroup: FormGroup;

  selectedVoivodeship: Voivodeship;
  disabledCity: boolean = true;

  countryList: Map<string, Country[]> = new Map();
  cityList: Set<City> = new Set();
  voivodeshipList: Set<Voivodeship> = new Set();

  employeeList: Map<string, Employee> = new Map();
  noteList: Map<string, Note> = new Map();

  cities$ = this.store.pipe(
    select(getCities),
    map((cities) => {
      return { key: "cities", list: cities };
    })
  );

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _companyFormBuilder: FormBuilder,
    private store: Store
  ) {}
  ngOnDestroy(): void {
    this.subscriptionParameters$.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptionParameters$ = this.cities$.subscribe((city) => {
      this.cityList = new Set([...city.list]);
    });

    this.countryList.set("polski", [
      {
        id: 1,
        name: "Polska",
      },
    ]);

    this.countryList.set("zagraniczny", [
      {
        id: 3,
        name: "Cypr",
      },
      {
        id: 2,
        name: "Serbia",
      },
    ]);

    this.voivodeshipList.add({
      id: 1,
      name: "Mazowieckie",
    });

    this.voivodeshipList.add({
      id: 2,
      name: "Pomorskie",
    });

    this.noteList.set(
      "sljdsoifdshjfoisdhoijhoiv ij oscd s  joidjcsdoijodf jodjcsdojdso",
      {
        id: 12,
        text:
          "sljdsoifdshjfoisdhoijhoiv ij oscd s  joidjcsdoijodf jodjcsdojdso",
        createdNote: "03-12-2020",
      }
    );
    this.noteList.set("qwssccyu jkjiibuuu bv", {
      id: 12,
      text: "qwssccyu jkjiibuuu bv",
      createdNote: "03-12-2020",
    });

    this.employeeList.set("sasasa", {
      id: "sasasa",
      name: "Patryk",
      surname: "Karaszewski",
      phone_number: "434445",
      fax: "sds",
      positionEmpolyee: {
        id: 1,
        name: "szef",
      },
    });
    this.employeeList.set("sasasadsd", {
      id: "sasasadsd",
      name: "Zuzanna",
      surname: "Karaszewski",
      phone_number: "434445",
      fax: "sds",
      positionEmpolyee: {
        id: 1,
        name: "szef",
      },
    });

    let { company, parameters } = this.data;
    this.setMarketGroup(parameters);

    this.baseParametersCompanyFormGroup = this._companyFormBuilder.group({
      name: [company.name ?? "", Validators.required],
      nip: [company.nip ?? ""],
      mail: [company.mail ?? "", Validators.email],
      web_page: [company.web_page ?? ""],
      phone_number: [company.phone_number ?? ""],
    });

    this.locationCompanyFormGroup = this._companyFormBuilder.group({
      address: [company.address ?? ""],
      post_code: [company.post_code ?? ""],
    });

    this.businessProfileCompanyFormGroup = this._companyFormBuilder.group({
      address: [company.address ?? ""],
      post_code: [company.post_code ?? ""],
    });

    this.fittingsProfilessFormGroup = this._companyFormBuilder.group({
      address: [company.address ?? ""],
      post_code: [company.post_code ?? ""],
    });

    this.employeesCompanyFormGroup = this._companyFormBuilder.group({
      name: [""],
      surname: [""],
      phone_number: [""],
      fax: [""],
      positionEmpolyee: [""],
    });

    this.notesCompanyFormGroup = this._companyFormBuilder.group({
      text: [""],
    });
  }
  selectedCountry(country) {
    this.selectedVoivodeship = null;
    this.store.dispatch(
      new GetCitiesByCountry({ loading: true, countriesIds: [country.id] })
    );
    this.disabledCity = false;
  }

  selectedCity(city) {
    this.selectedVoivodeship = city.voivodeship;
  }

  addNote() {
    let { text } = this.notesCompanyFormGroup.value;

    if (this.noteList.has(text)) {
      this.removeNote(text);
    }

    const note: Note = {
      id: null,
      text: text,
      createdNote: this.currentDateTime
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replace("/ /g", "-"),
    };

    this.noteList.set(note.text, note);
  }

  updateNote(textNote) {
    const note = this.noteList.get(textNote);

    console.log(note);
    this.notesCompanyFormGroup = this._companyFormBuilder.group({
      text: note.text,
    });
  }

  removeNote(textNote) {
    this.noteList.delete(textNote);
  }

  addEmployees() {
    let {
      id,
      name,
      surname,
      fax,
      phone_number,
      positionEmpolyee,
    } = this.employeesCompanyFormGroup.value;

    if (this.employeeList.has(id)) {
      this.removeEmployee(id);
    }

    const employee: Employee = {
      id: uuidv4(),
      name: name,
      surname: surname,
      phone_number: phone_number,
      fax: fax,
      positionEmpolyee: {
        id: positionEmpolyee.id,
        name: positionEmpolyee.name,
      },
    };

    this.employeeList.set(employee.id, employee);
  }

  updateEmployee(employeeId) {
    const employee = this.employeeList.get(employeeId);

    this.employeesCompanyFormGroup = this._companyFormBuilder.group({
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      phone_number: employee.phone_number,
      fax: employee.fax,
      positionEmpolyee: employee.positionEmpolyee.name,
    });
  }

  removeEmployee(employeeId) {
    this.employeeList.delete(employeeId);
  }

  setMarketGroup(parameters) {
    // parameters.get("countries").forEach((country) => {
    //   if (country.name === CountryEnum.polish) {
    //     this.marketGroup
    //       .find((country) => country.name === "Rynek polski")
    //       .country.push(country.name);
    //   } else {
    //     this.marketGroup
    //       .find((country) => country.name === "Rynek zagraniczny")
    //       .country.push(country.name);
    //   }
    // });
    // console.log(this.marketGroup);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSaveAndCloseClick() {
    console.log(
      this.baseParametersCompanyFormGroup,
      this.businessProfileCompanyFormGroup,
      this.locationCompanyFormGroup
    );
    this.dialogRef.close(this.data);
  }
}
