import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "name",
    "voievodeship",
    "miasto",
    "nip",
    "address",
    "businessProfiles",
    "actions",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  step1 = 0;
  step2 = 0;
  panelOpenState1 = false;
  panelOpenState2 = false;

  businessProfiles = new FormControl();
  businessProfilesList: string[] = ["XXX", "XXXX", "XXX"];

  voivedeships = new FormControl();
  voivedeshipsList: string[] = ["XXX", "XXXX", "XXX"];

  cities = new FormControl();
  citiesList: string[] = ["XXX", "XXXX", "XXX"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  setStep1(index: number) {
    this.step1 = index;
  }

  nextStep1() {
    this.step1++;
  }

  prevStep1() {
    this.step1--;
  }

  setStep2(index: number) {
    this.step2 = index;
  }

  nextStep2() {
    this.step2++;
  }

  prevStep2() {
    this.step2--;
  }
}

export interface PeriodicElement {
  name: string;
  voievodeship: string;
  miasto: string;
  nip: string;
  address: string;
  businessProfiles: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
  {
    name: "xxx",
    voievodeship: "xxx",
    miasto: "xxx",
    nip: "xxx",
    address: "xxx",
    businessProfiles: "xxx",
  },
];
