const ClientsService = require("../../../lib/client/clientService");
const companyUpdater = require("../../../lib/client/companyUpdater");
const company = require("../../fake/client/client.json");
const expectCompany = require("../../fake/client/expect-client.json");
const companies = require("../../../db/models/companies");

jest.mock("../../../db/models");
const mockFind = jest.fn();
jest.mock("../../../db/models/companies", () => {
  return jest.fn().mockImplementation(() => {
    return { associate: mockFind };
  });
});

const mockUpdateCompany = jest.fn();
jest.mock("../../../lib/client/companyUpdater", () => {
  return jest.fn().mockImplementation(() => {
    return { updateCompany: mockUpdateCompany };
  });
});

let Companies;
let clientsService;

beforeEach(() => {
  Companies = new companies();
  clientsService = new ClientsService();
});

describe("ClientsService", () => {
  it("method updateCompany should return client", async () => {
    mockUpdateCompany.mockReturnValueOnce(company);

    await clientsService.updateCompany(company);
    let expextedCompany = await clientsService.getCompanyById(1);
    expect(expextedCompany).toEqual(company);
  });
});
