import { CountryEnum } from "../../core/enums/client/countries";

export interface Filter {
  limit: number;
  offset: number;
  name: string[];
  business_profiles: string[];
  voivodeships: string[];
  cities: string[];
  country: string;
}
