import { City } from "./city";
import { Country } from "./country";
import { Voivodeship } from "./voivodeship";
import { Employee } from "./employee";
import { BusinessProfile } from "./businessProfile";
import { AluminiumProfile, PcvProfile } from "./profiles";
import { AluminiumFitting, PcvFitting } from "./fittings";

export interface Company {
  id: string;
  name: string;
  nip: string;
  email: string;
  web_page: string;
  phone_number: string;
  address: string;
  post_code: string;
  city: City;
  country: Country;
  voivodeship: Voivodeship;
  employees: Employee[];
  businessProfiles: BusinessProfile[];
  aluminiumProfiles: AluminiumProfile[];
  pcvProfiles: PcvProfile[];
  aluminiumFittings: AluminiumFitting[];
  pcvFittings: PcvFitting[];
}
