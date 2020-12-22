import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingListComponent } from "./components/setting-list/setting-list.component";
import { SettingTabsComponent } from "./components/setting-tabs/setting-tabs.component";
import { SettingComponent } from "./containers/setting/setting.component";
import { SettingRoutingModule } from "./setting-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, Authentication_KEY, AccountEffects } from "./store";

import {
  SettingCountryTabComponent,
  SettingCityTabComponent,
  SettingVoivodeshipTabComponent,
  SettingBusinessProfileTabComponent,
  SettingAluminiumFittingTabComponent,
  SettingAluminiumProfileTabComponent,
  SettingPcvFittingTabComponent,
  SettingPcvProfileTabComponent,
  SettingPositionEmployeeTabComponent,
} from "./components/setting-tabs/client";
import {
  SettingUserTabComponent,
  SettingGroupTabComponent,
  SettingAccountTabComponent,
} from "./components/setting-tabs/authentication-authorization";

@NgModule({
  declarations: [
    SettingListComponent,
    SettingTabsComponent,
    SettingComponent,
    SettingCountryTabComponent,
    SettingCityTabComponent,
    SettingVoivodeshipTabComponent,
    SettingBusinessProfileTabComponent,
    SettingAluminiumFittingTabComponent,
    SettingAluminiumProfileTabComponent,
    SettingPcvFittingTabComponent,
    SettingPcvProfileTabComponent,
    SettingPositionEmployeeTabComponent,
    SettingAccountTabComponent,
    SettingUserTabComponent,
    SettingGroupTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingRoutingModule,
    StoreModule.forFeature(Authentication_KEY, reducers),
    EffectsModule.forFeature([AccountEffects]),
  ],
})
export class SettingModule {}
