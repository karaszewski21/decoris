import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Company } from "../../../interfaces/client";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getClients(parameters): Observable<Company[]> {
    let companies: Observable<Company[]>;

    companies = this.httpClient.post<Company[]>(
      `${environment.apiUrl}clients/get-clients`,
      parameters
    );
    console.log(companies);
    return companies;
  }

  addClient(company): Observable<Company[]> {
    let companies: Observable<Company[]>;

    companies = this.httpClient.post<Company[]>(
      `${environment.apiUrl}clients/add-client`,
      company
    );

    return companies;
  }

  updateClient(company): Observable<Company[]> {
    let companies: Observable<Company[]>;

    console.log(company);

    companies = this.httpClient.put<Company[]>(
      `${environment.apiUrl}clients/update-client`,
      company
    );

    return companies;
  }

  deleteClient(companyId): Observable<string> {
    let companies: Observable<string>;

    companies = this.httpClient.delete<string>(
      `${environment.apiUrl}clients/delete-client/${companyId}`
    );

    return companies;
  }
}
