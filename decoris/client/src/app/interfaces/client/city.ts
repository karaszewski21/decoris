import { Voivodeship } from "./voivodeship";
import { Country } from "./country";

export interface City {
  id: number;
  name: string;
  voivodeship: Voivodeship;
  country: Country;
}
