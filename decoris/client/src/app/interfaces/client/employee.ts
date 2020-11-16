import { PositionEmployee } from "./positionEmployee";

export interface Employee {
  id: string;
  name: string;
  surname: string;
  phone_number: string;
  fax: string;
  positionEmployee: PositionEmployee;
}
