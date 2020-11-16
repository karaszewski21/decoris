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
import { NgxSpinnerService } from "ngx-spinner";
import {
  Note,
  Employee,
  Country,
  City,
  Voivodeship,
  BusinessProfile,
  AluminiumProfile,
  AluminiumFitting,
  PcvProfile,
  PcvFitting,
} from "../../../interfaces/client";
import { v4 as uuidv4 } from "uuid";
import { Store, select } from "@ngrx/store";
import {
  getCities,
  getParametersLoading,
  GetCitiesByCountry,
  getAluminiumProfiles,
  getAluminiumFittings,
  getPcvProfiles,
  getPcvFittings,
  getCountries,
  getVoivodeships,
  getBusinessProfiles,
  getPositionEmployees,
} from "../../store";
import { map } from "rxjs/operators";
import { Subscription, merge } from "rxjs";
import { CountryEnum } from "../../../core/enums/client/countries";

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
  subscriptionCities$: Subscription;
  parameters: Map<string, any[]> = new Map();
  getParametersLoading$ = this.store.select(getParametersLoading);

  baseParametersCompanyFormGroup: FormGroup;
  locationCompanyFormGroup: FormGroup;
  businessProfileCompanyFormGroup: FormGroup;
  fittingsProfilessFormGroup: FormGroup;
  employeesCompanyFormGroup: FormGroup;
  notesCompanyFormGroup: FormGroup;

  countryList: Map<string, Country[]> = new Map();
  cityList: City[];
  countryControl: FormControl;

  cityControl: FormControl;
  voivodeshipList: Voivodeship[];
  selectedVoivodeship: Voivodeship;
  disabledCity: boolean = true;

  businessProfileList: BusinessProfile[];
  selectedBusinessProfileList: string[];
  businessProfileControl: FormControl;

  aluminiumProfileList: AluminiumProfile[];
  selectedAluminiumProfileList: string[];
  aluminiumProfileControl: FormControl;

  aluminiumFittingList: AluminiumFitting[];
  selectedAluminiumFittingList: string[];
  aluminiumFittingControl: FormControl;

  pcvProfileList: PcvProfile[];
  selectedPcvProfileList: string[];
  pcvProfileControl: FormControl;

  pcvFittingList: PcvFitting[];
  selectedPcvFittingList: string[];
  pcvFittingControl: FormControl;

  selectedEmployeeList: Map<string, Employee> = new Map();
  positionEmployeeList: string[];
  positionEmployeeControl: FormControl;

  selectedNoteList: Map<string, Note> = new Map();

  countries$ = this.store.pipe(
    select(getCountries),
    map((countries) => {
      return { key: "countries", list: countries };
    })
  );

  positionEmployees$ = this.store.pipe(
    select(getPositionEmployees),
    map((positionEmployees) => {
      return { key: "positionEmployees", list: positionEmployees };
    })
  );

  voivodeships$ = this.store.pipe(
    select(getVoivodeships),
    map((voivodeships) => {
      return { key: "voivodeships", list: voivodeships };
    })
  );

  businessProfiles$ = this.store.pipe(
    select(getBusinessProfiles),
    map((businessProfiles) => {
      return {
        key: "businessProfiles",
        list: businessProfiles,
      };
    })
  );

  cities$ = this.store.pipe(
    select(getCities),
    map((cities) => {
      return { key: "cities", list: cities };
    })
  );

  aluminiumProfiles$ = this.store.pipe(
    select(getAluminiumProfiles),
    map((aluminiumProfiles) => {
      return {
        key: "aluminiumProfiles",
        list: aluminiumProfiles,
      };
    })
  );

  aluminiumFittings$ = this.store.pipe(
    select(getAluminiumFittings),
    map((aluminiumFittings) => {
      return {
        key: "aluminiumFittings",
        list: aluminiumFittings,
      };
    })
  );

  pcvProfiles$ = this.store.pipe(
    select(getPcvProfiles),
    map((pcvProfiles) => {
      return {
        key: "pcvProfiles",
        list: pcvProfiles,
      };
    })
  );

  pcvFittings$ = this.store.pipe(
    select(getPcvFittings),
    map((pcvFittings) => {
      return { key: "pcvFittings", list: pcvFittings };
    })
  );

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _companyFormBuilder: FormBuilder,
    private store: Store,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    let { company } = this.data;
    this.initParameters();
    this.initControles(company);
    this.initSelectedParameters(company);
  }

  ngOnDestroy(): void {
    this.subscriptionCities$.unsubscribe();
    this.subscriptionParameters$.unsubscribe();
  }
  initSelectedParameters(company: any) {
    if (company) {
      this.selectedBusinessProfileList = company.BusinessProfiles;
      this.selectedAluminiumProfileList = company.AluminiumProfiles;
      this.selectedAluminiumFittingList = company.AluminiumFittings;
      this.selectedPcvProfileList = company.PcvProfiles;
      this.selectedPcvFittingList = company.PcvFittings;
    } else {
      this.selectedBusinessProfileList = [];
      this.selectedAluminiumProfileList = [];
      this.selectedAluminiumFittingList = [];
      this.selectedPcvProfileList = [];
      this.selectedPcvFittingList = [];
    }
  }

  initParameters() {
    this.subscriptionCities$ = this.cities$.subscribe((city) => {
      this.cityList = [...city.list];
    });

    this.getParametersLoading$.subscribe((loading) => {
      if (!loading) {
        this.subscriptionParameters$ = merge(
          this.countries$,
          this.voivodeships$,
          this.businessProfiles$,
          this.aluminiumProfiles$,
          this.aluminiumFittings$,
          this.pcvProfiles$,
          this.pcvFittings$,
          this.positionEmployees$
        ).subscribe((value) => {
          this.parameters.set(value.key, value.list);

          this.spinner.hide();
        });
      }
    });

    this.businessProfileList = [...this.parameters.get("businessProfiles")];
    this.aluminiumProfileList = [...this.parameters.get("aluminiumProfiles")];
    this.aluminiumFittingList = [...this.parameters.get("aluminiumFittings")];
    this.pcvProfileList = [...this.parameters.get("pcvProfiles")];
    this.pcvFittingList = [...this.parameters.get("pcvFittings")];
    this.voivodeshipList = [...this.parameters.get("voivodeships")];
    this.positionEmployeeList = [...this.parameters.get("positionEmployees")];
    this.countryList.set(
      "polski",
      [...this.parameters.get("countries")].filter(
        (country) => country.name === CountryEnum.polish
      )
    );
    this.countryList.set(
      "zagraniczny",
      [...this.parameters.get("countries")].filter(
        (country) => country.name !== CountryEnum.polish
      )
    );
  }

  initControles(company) {
    this.businessProfileControl = new FormControl();
    this.aluminiumProfileControl = new FormControl();
    this.aluminiumFittingControl = new FormControl();
    this.pcvProfileControl = new FormControl();
    this.pcvFittingControl = new FormControl();
    this.positionEmployeeControl = new FormControl();
    this.countryControl = new FormControl();
    this.cityControl = new FormControl();

    this.baseParametersCompanyFormGroup = this._companyFormBuilder.group({
      name: [company?.name ?? "", Validators.required],
      nip: [company?.nip ?? ""],
      mail: [company?.mail ?? "", Validators.email],
      web_page: [company?.web_page ?? ""],
      phone_number: [company?.phone_number ?? ""],
    });

    this.locationCompanyFormGroup = this._companyFormBuilder.group({
      address: [company?.address ?? ""],
      post_code: [company?.post_code ?? ""],
    });

    this.businessProfileCompanyFormGroup = this._companyFormBuilder.group({
      address: [company?.address ?? ""],
      post_code: [company?.post_code ?? ""],
    });

    this.fittingsProfilessFormGroup = this._companyFormBuilder.group({
      address: [company?.address ?? ""],
      post_code: [company?.post_code ?? ""],
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

    if (this.selectedNoteList.has(text)) {
      this.removeNote(text);
    }

    const note: Note = {
      id: null,
      text: text,
      createdNote: `${this.currentDateTime.getDate()}-${this.currentDateTime.getMonth()}-${this.currentDateTime.getFullYear()}`,
    };

    this.selectedNoteList.set(note.text, note);
  }

  updateNote(textNote) {
    const note = this.selectedNoteList.get(textNote);

    console.log(note);
    this.notesCompanyFormGroup = this._companyFormBuilder.group({
      text: note.text,
    });
  }

  removeNote(textNote) {
    this.selectedNoteList.delete(textNote);
  }

  addEmployees() {
    let {
      id,
      name,
      surname,
      fax,
      phone_number,
    } = this.employeesCompanyFormGroup.value;

    let {
      id: positionEmployeeId,
      name: namePositionEmpolyee,
    } = this.positionEmployeeControl.value;

    if (this.selectedEmployeeList.has(id)) {
      this.removeEmployee(id);
    }

    const employee: Employee = {
      id: uuidv4(),
      name: name,
      surname: surname,
      phone_number: phone_number,
      fax: fax,
      positionEmployee: {
        id: positionEmployeeId,
        name: namePositionEmpolyee,
      },
    };

    this.selectedEmployeeList.set(employee.id, employee);
  }

  updateEmployee(employeeId) {
    const employee = this.selectedEmployeeList.get(employeeId);

    this.employeesCompanyFormGroup = this._companyFormBuilder.group({
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      phone_number: employee.phone_number,
      fax: employee.fax,
      positionEmpolyee: employee.positionEmployee.name,
    });
  }

  removeEmployee(employeeId) {
    this.selectedEmployeeList.delete(employeeId);
  }

  selectedBusinessProfile(businessProfile) {
    this.selectedBusinessProfileList = businessProfile;
  }

  selectedAluminiumProfile(aluminiumProfile) {
    this.selectedAluminiumProfileList = aluminiumProfile;
  }
  selectedAluminiumFitting(aluminiumFitting) {
    this.selectedAluminiumFittingList = aluminiumFitting;
  }
  selectedPcvProfile(pcvProfile) {
    this.selectedPcvProfileList = pcvProfile;
  }
  selectedPcvFitting(pcvFitting) {
    this.selectedPcvFittingList = pcvFitting;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSaveAndCloseClick() {
    console.log(
      this.baseParametersCompanyFormGroup,
      this.locationCompanyFormGroup,
      this.selectedBusinessProfileList,
      this.selectedAluminiumProfileList,
      this.selectedAluminiumFittingList,
      this.selectedPcvProfileList,
      this.selectedPcvFittingList,
      this.selectedEmployeeList,
      this.selectedNoteList
    );
    let {
      name,
      nip,
      email,
      web_page,
      phone_number,
    } = this.baseParametersCompanyFormGroup.value;

    let { address, post_code } = this.locationCompanyFormGroup.value;
    console.log(this.countryControl.value);
    let { name: nameCountry } = this.countryControl.value;
    console.log(this.cityControl.value);
    let {
      name: nameCity,
      voivodeship: { name: nameVoivodeship },
    } = this.cityControl.value;

    let data = {
      parameters: {
        name: name,
        nip: nip,
        email: email,
        web_page: web_page,
        phone_number: phone_number,
        address: address,
        post_code: post_code,
        city: nameCity,
        voivodeship: nameVoivodeship,
        country: nameCountry,
      },
      employees: [...this.selectedEmployeeList.values()],
      notes: [...this.selectedNoteList.values()],
      business_profiles: this.selectedBusinessProfileList,
      aluminium_profiles: this.selectedAluminiumProfileList,
      aluminium_fittings: this.selectedAluminiumFittingList,
      pcv_profiles: this.selectedPcvProfileList,
      pcv_fittings: this.selectedPcvFittingList,
    };

    console.log(data);

    this.dialogRef.close([data]);
  }
}
