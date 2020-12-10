import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Company } from "../../../interfaces/client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    return companies;
  }

  addClient(company): Observable<any> {
    let companies: Observable<any>;

    companies = this.httpClient.post<any>(
      `${environment.apiUrl}clients/add-client`,
      company
    );

    return companies;
  }

  updateClient(company): Observable<any> {
    let companies: Observable<any>;

    companies = this.httpClient.put<any>(
      `${environment.apiUrl}clients/update-client`,
      company
    );

    return companies;
  }

  deleteClient(companyId): Observable<Company> {
    let companies: Observable<Company>;

    companies = this.httpClient.delete<Company>(
      `${environment.apiUrl}clients/delete-client/${companyId}`
    );

    return companies;
  }

  exportClients(type: string) {
    let companies: Observable<any>;

    companies = this.httpClient.get(
      `${environment.apiUrl}clients/export/${type}`,
      { responseType: "blob" }
    );

    return companies;
  }
}
