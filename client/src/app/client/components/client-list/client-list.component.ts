import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Company } from "../../../interfaces/client/company";
import { MatTableDataSource } from "@angular/material/table";
import { CountryEnum } from "../../../core/enums/client/countries";
import { MediaObserver } from "@angular/flex-layout";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit, OnChanges {
  @Input() companyList: Company[];
  @Input() displayedColumns: string[];

  @Output() toggleColumnVoivodeshipOrCountryEvent = new EventEmitter();
  @Output() updateCompanyEvent = new EventEmitter();
  @Output() deleteClientEvent = new EventEmitter<string>();
  @Output() employeesModalEvent = new EventEmitter();
  @Output() notesModalEvent = new EventEmitter();
  @Output() profilesFittingssModalEvent = new EventEmitter();

  dataSource: MatTableDataSource<Company>;
  constructor(public media: MediaObserver) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.companyList) {
      let selectedCountry = this.companyList.find(
        (company) => company.country.name
      );
      this.toggleColumn(selectedCountry);
      this.dataSource = new MatTableDataSource<Company>(this.companyList);
    }
  }

  ngOnInit(): void {}

  updateCompany(element) {
    this.updateCompanyEvent.emit(element);
  }

  deleteCompany(companyId) {
    this.deleteClientEvent.emit(companyId);
  }

  toggleColumn(selectedCountry) {
    if (selectedCountry.country.name === "Polska") {
      this.displayedColumns = [
        "name",
        "business_profiles",
        "city",
        "voivodeship",
        "nip",
        "address",
        "employees",
        "notes",
        "profiles&fittings",
        "update",
        "remove",
      ];
    } else {
      this.displayedColumns = [
        "name",
        "business_profiles",
        "city",
        "country",
        "nip",
        "address",
        "employees",
        "notes",
        "profiles&fittings",
        "update",
        "remove",
      ];
    }
  }

  openEmployeesModal(employees) {
    this.employeesModalEvent.emit(employees);
  }

  openNotesModal(notes) {
    this.notesModalEvent.emit(notes);
  }

  openProfilesAndFittingsModal(profilesFittings) {
    this.profilesFittingssModalEvent.emit(profilesFittings);
  }
}
