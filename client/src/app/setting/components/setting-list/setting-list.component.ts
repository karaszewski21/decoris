import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ISettingGroup } from "../../../interfaces/setting/client";

@Component({
  selector: "app-setting-list",
  templateUrl: "./setting-list.component.html",
  styleUrls: ["./setting-list.component.scss"],
})
export class SettingListComponent implements OnInit {
  @Input() settingGroups: ISettingGroup[];
  @Output() selectSettingEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  select(label) {
    this.selectSettingEvent.emit({
      settingGroupLabel: label[0],
      settingLabel: label[1],
    });
  }
}
