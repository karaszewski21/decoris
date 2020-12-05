import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    return cities;
  }

  addClientParameter(parameter: any) {
    let body = null;

    if (parameter.association) {
      body = {
        name: parameter.name,
        value: parameter.value,
        association: parameter.association,
      };
    } else {
      body = {
        name: parameter.name,
        value: parameter.value,
      };
    }

    return this.httpClient.post<any>(
      `${environment.apiUrl}parameters/add-client-parameter`,
      { parameter: body }
    );
  }

  removeClientParameter(parameter: any) {
    const options = {
      headres: new HttpHeaders({ "Content-Type": "application/json" }),
      body: { parameter: { name: parameter.name, value: parameter.value } },
    };

    return this.httpClient.request(
      "delete",
      `${environment.apiUrl}parameters/delete-client-parameter`,
      options
    );
  }
}
