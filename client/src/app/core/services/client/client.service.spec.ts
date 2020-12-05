import { TestBed, async } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ClientService } from "./client.service";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpClientModule } from "@angular/common/http";

describe("ClientService", () => {
  let clientService: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [HttpClientModule],
    });
    clientService = TestBed.inject(ClientService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(clientService).toBeTruthy();
  });

  it("should be get companies from api", () => {
    const dummyCompanies = [];
    const parametrs = {};

    clientService.getClients(parametrs).subscribe((companies) => {
      expect(companies).toEqual(dummyCompanies);
    });

    let clientRequest = httpMock.expectOne(environment.apiUrl);

    expect(clientRequest.request.method).toBe("POST");
    clientRequest.flush(dummyCompanies);
  });

  afterEach(() => httpMock.verify());
});
