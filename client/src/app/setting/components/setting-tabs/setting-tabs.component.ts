import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ISetting, ISettingItem } from "../../../interfaces/setting/client";

@Component({
  selector: "app-setting-tabs",
  templateUrl: "./setting-tabs.component.html",
  styleUrls: ["./setting-tabs.component.scss"],
})
export class SettingTabsComponent implements OnInit {
  @Input() selectedSetting: ISetting;
  @Output() backEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  save() {}

  back() {
    this.backEvent.emit();
  }
}
