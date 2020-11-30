import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingListComponent } from "./components/setting-list/setting-list.component";
import { SettingTabsComponent } from "./components/setting-tabs/setting-tabs.component";
import { SettingComponent } from "./containers/setting/setting.component";
import { SettingRoutingModule } from "./setting-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ParametersClientEffects, parametersReducer } from "../core/store";
import {
  SettingCountryTabComponent,
  SettingCityTabComponent,
  SettingVoivodeshipTabComponent,
} from "./components/setting-tabs/client";

@NgModule({
  declarations: [
    SettingListComponent,
    SettingTabsComponent,
    SettingComponent,
    SettingCountryTabComponent,
    SettingCityTabComponent,
    SettingVoivodeshipTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingRoutingModule,
    StoreModule.forFeature("client", {
      parametersReducer,
    }),
    EffectsModule.forFeature([ParametersClientEffects]),
  ],
})
export class SettingModule {}
