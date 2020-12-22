import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { settingDynamicTabList } from "../../data/dynamic-tab-setting";
import { ISetting } from "../../../interfaces/setting/client";
import { Store } from "@ngrx/store";
import { GetAccounts, GetUsers } from "../../store";

type PanelType = "left" | "right";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"],
  animations: [
    trigger("slide", [
      state("left", style({ transform: "translateX(0)" })),
      state("right", style({ transform: "translateX(-50%)" })),
      transition("* => *", animate(300)),
    ]),
  ],
})
export class SettingComponent implements OnInit, OnDestroy {
  activePanel: PanelType = "left";
  settingGroups = settingDynamicTabList;
  selectedSetting: ISetting = settingDynamicTabList[0].settings[0];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAccounts({ loading: true }));
    this.store.dispatch(new GetUsers({ loading: true }));
  }
  ngOnDestroy(): void {
    console.log("destroy setting");
  }

  selectSetting(value) {
    let { settingGroupLabel, settingLabel } = value;
    this.selectedSetting = settingDynamicTabList
      .find((value) => value.label === settingGroupLabel)
      .settings.find((value) => value.label === settingLabel);

    this.activePanel = "right";
  }

  backToMenuSetting() {
    this.activePanel = "left";
  }

  save(event) {
    console.log(event);
  }
}
