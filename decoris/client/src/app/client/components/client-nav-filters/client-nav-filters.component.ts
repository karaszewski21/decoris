import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-client-nav-filters",
  templateUrl: "./client-nav-filters.component.html",
  styleUrls: ["./client-nav-filters.component.scss"],
})
export class ClientNavFiltersComponent implements OnInit {
  @Input() filterList: Map<string, any[]>;
  @Output() getFilterListEvent = new EventEmitter();
  businessProfiles = new FormControl();
  businessProfilesList: string[] = ["XXX", "XXXX", "XXX"];

  voivedeships = new FormControl();
  voivedeshipsList: string[] = ["XXX", "XXXX", "XXX"];

  cities = new FormControl();
  citiesList: string[] = ["XXX", "XXXX", "XXX"];

  constructor() {}

  ngOnInit(): void {
    this.getFilterListEvent.emit();
  }
}
