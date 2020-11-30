import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-client-nav-search",
  templateUrl: "./client-nav-search.component.html",
  styleUrls: ["./client-nav-search.component.scss"],
})
export class ClientNavSearchComponent implements OnInit {
  @Input() nameCompanyFilterControl: FormControl;
  @Output() selectedNameCompanyFilterEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.nameCompanyFilterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((name) => {
        this.selectedNameCompanyFilterEvent.emit(name);
      });
  }
}
