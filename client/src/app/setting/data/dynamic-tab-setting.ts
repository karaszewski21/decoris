import {
  SettingCountryTabComponent,
  SettingCityTabComponent,
  SettingVoivodeshipTabComponent,
  SettingBusinessProfileTabComponent,
  SettingAluminiumProfileTabComponent,
  SettingAluminiumFittingTabComponent,
  SettingPcvProfileTabComponent,
  SettingPcvFittingTabComponent,
  SettingPositionEmployeeTabComponent,
} from "../components/setting-tabs/client";
import { ISettingGroup } from "../../interfaces/setting/client/ISettingGroup";

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
            label: "Profile Alu",
            component: SettingAluminiumProfileTabComponent,
          },
          {
            label: "Okucia Alu",
            component: SettingAluminiumFittingTabComponent,
          },
          {
            label: "Profile PCV",
            component: SettingPcvProfileTabComponent,
          },
          {
            label: "Okucia PCV",
            component: SettingPcvFittingTabComponent,
          },
        ],
      },
      {
        label: "Dodatkowe ustawienia",
        settingItems: [
          {
            label: "Stanowiska firmowe",
            component: SettingPositionEmployeeTabComponent,
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
