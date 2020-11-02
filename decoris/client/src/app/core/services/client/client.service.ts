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

  getClients(parametrs): Observable<Company[]> {
    let companies: Observable<Company[]>;

    companies = this.httpClient.post<Company[]>(
      `${environment.apiUrl}clients/get-clients`,
      parametrs
    );

    return companies;
  }
}
