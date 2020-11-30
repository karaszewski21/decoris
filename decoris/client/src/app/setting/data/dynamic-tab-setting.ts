import { SettingCountryTabComponent } from "../components/setting-tabs/client/localization/setting-country-tab/setting-country-tab.component";
import { SettingCityTabComponent } from "../components/setting-tabs/client/localization/setting-city-tab/setting-city-tab.component";
import { SettingVoivodeshipTabComponent } from "../components/setting-tabs/client/localization/setting-voivodeship-tab/setting-voivodeship-tab.component";
import { ISettingGroup } from "../../interfaces/setting/client";
import { SettingBusinessProfileTabComponent } from "../components/setting-tabs/client/business-profile/setting-business-profile-tab/setting-business-profile-tab.component";
import { SettingAluminiumProfileTabComponent } from "../components/setting-tabs/client/profile-fitting/setting-aluminium-profile-tab/setting-aluminium-profile-tab.component";
import { SettingAluminiumFittingTabComponent } from "../components/setting-tabs/client/profile-fitting/setting-aluminium-fitting-tab/setting-aluminium-fitting-tab.component";
import { SettingPcvProfileTabComponent } from "../components/setting-tabs/client/profile-fitting/setting-pcv-profile-tab/setting-pcv-profile-tab.component";
import { SettingPcvFittingTabComponent } from "../components/setting-tabs/client/profile-fitting/setting-pcv-fitting-tab/setting-pcv-fitting-tab.component";

export let settingDynamicTabList: ISettingGroup[] = [
  {
    label: "Klient",
    settings: [
      {
        label: "Lokalizacja",
        settingItems: [
          { label: "Panstwo", component: SettingCountryTabComponent },
          { label: "Miasto", component: SettingCityTabComponent },
          { label: "Wojewodztwo", component: SettingVoivodeshipTabComponent },
        ],
      },
      {
        label: "Profile biznesowe",
        settingItems: [
          {
            label: "Profile biznesowe",
            component: SettingBusinessProfileTabComponent,
          },
        ],
      },
      {
        label: "Profile i Okucia",
        settingItems: [
          {
            label: "Profile",
            component: SettingAluminiumProfileTabComponent,
          },
          {
            label: "Okucia",
            component: SettingAluminiumFittingTabComponent,
          },
          {
            label: "Profile",
            component: SettingPcvProfileTabComponent,
          },
          {
            label: "Okucia",
            component: SettingPcvFittingTabComponent,
          },
        ],
      },
    ],
  },
  {
    label: "Uprawnienia",
    settings: [
      {
        label: "Uzytkownicy i Grupy",
        settingItems: [
          { label: "Panstwo", component: SettingCountryTabComponent },
          { label: "Miasto", component: SettingCityTabComponent },
          { label: "Wojewodztwo", component: SettingVoivodeshipTabComponent },
        ],
      },
    ],
  },
];
