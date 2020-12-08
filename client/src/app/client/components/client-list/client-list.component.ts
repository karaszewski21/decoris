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
  @Input() currentMarket: CountryEnum;

  @Output() toggleColumnVoivodeshipOrCountryEvent = new EventEmitter();
  @Output() updateCompanyEvent = new EventEmitter();
  @Output() deleteClientEvent = new EventEmitter<string>();
  @Output() employeesModalEvent = new EventEmitter();
  @Output() notesModalEvent = new EventEmitter();
  @Output() profilesFittingssModalEvent = new EventEmitter();

  displayedColumns: string[] = [
    "name",
    "country",
    "business_profiles",
    "city",
    "nip",
    "address",
    "employees",
    "notes",
    "profiles&fittings",
    "update",
    "remove",
  ];
  dataSource: MatTableDataSource<Company>;

  constructor(public media: MediaObserver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentMarket) {
      this.toggleColumn(this.currentMarket);
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

  toggleColumn(currentMarket: string) {
    if (
      currentMarket === CountryEnum.polish ||
      currentMarket === CountryEnum.all
    ) {
      let indexVoivodeship = this.displayedColumns.indexOf("voivodeship");
      if (indexVoivodeship === -1) {
        this.displayedColumns.splice(3, 0, "voivodeship");
      }
    } else {
      let indexVoivodeship = this.displayedColumns.indexOf("voivodeship");
      if (indexVoivodeship > 0) {
        this.displayedColumns.splice(indexVoivodeship, 1);
      }
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
