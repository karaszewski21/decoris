import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ParametersClientService {
  constructor(private httpClient: HttpClient) {}

  getParameters(): Observable<any> {
    const parameters = this.httpClient.get<any>(
      `${environment.apiUrl}parameters/get-parameters`
    );

    return parameters;
  }
  getCitiesByCountryId(countriesIds): Observable<any> {
    const cities = this.httpClient.post<any>(
      `${environment.apiUrl}parameters/get-cities`,
      { countriesIds: countriesIds }
    );

    console.log(cities);
    return cities;
  }
}
