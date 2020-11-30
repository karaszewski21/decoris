import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getVoivodeships } from "../../../../../../core/store";
import { Voivodeship } from "../../../../../../interfaces/client";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-setting-voivodeship-tab",
  templateUrl: "./setting-voivodeship-tab.component.html",
  styleUrls: ["./setting-voivodeship-tab.component.scss"],
})
export class SettingVoivodeshipTabComponent implements OnInit {
  voivodeship: Voivodeship;
  voivodeshipControl: FormControl = new FormControl();
  voivodeships$ = this.store.pipe(select(getVoivodeships));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.voivodeshipControl.valueChanges.subscribe((name) => {
      this.voivodeship = name;
    });
  }
  saveVoivodeship() {
    //dispach
  }

  selectedVoivodeship({ value }) {
    this.voivodeship = value;
    this.voivodeshipControl.setValue(value.name);
  }
}
