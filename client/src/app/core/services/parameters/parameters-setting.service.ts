import { Injectable } from "@angular/core";
import { Country } from "../../../interfaces/client/country";
import { City } from "../../../interfaces/client/city";
import { Voivodeship } from "../../../interfaces/client/voivodeship";

export type ParameterType = Country[] | City[] | Voivodeship[];

@Injectable({
  providedIn: "root",
})
export abstract class ParametersSettingService {
  abstract setName(name: string);
  abstract getName(): string;
}

@Injectable({
  providedIn: "root",
})
export class CountryParametersSettingService extends ParametersSettingService {
  name: string;
  setName(name: string) {
    this.name = name;
  }
  getName(): string {
    return "Lista panstw";
  }
}
