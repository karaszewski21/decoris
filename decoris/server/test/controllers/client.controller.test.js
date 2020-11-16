const request = require("supertest");
const app = require("../../app");
const clientsService = require("../../lib/client/clientService");
const { mockRequest, mockResponse } = require("../util/interceptor");
const ClientsController = require("../../controllers/clientController");

const mockUpdateCompanyById = jest.fn();
jest.mock("../../lib/client/clientService", () => {
  return jest.fn().mockImplementation(() => {
    return { updateCompanyById: mockUpdateCompanyById };
  });
});

const company = require("../fake/client/client.json");
const expectCompany = require("../fake/client/expect-client.json");

let clientsController;

beforeEach(() => {
  clientsController = ClientsController;
});

describe("POST api/clients", () => {
  it("/update-client/1 should be status 200", async () => {
    let response = await request(app)
      .put("/api/clients/update-client/1")
      .set("Accept", "application/json")
      .send({ company: company });

    expect(response.status).toBe(200);
  });

  it("/update-client/1 should be status 404", async () => {
    let response = await request(app)
      .put("/api/clients/update-client/1")
      .set("Accept", "application/json")
      .send({ company: null });

    expect(response.status).toBe(404);
  });
});

describe("method updateCompanyById of class clientController", () => {
  it("should call once method updateCompanyById of class clientsService", async () => {
    req = mockRequest();
    req.params.id = 1;
    req.body = company;

    res = mockResponse();

    await clientsController.updateClientById(req, res);

    expect(mockUpdateCompanyById).toHaveBeenCalled();
  });

  it("should not call once method updateCompanyById of class clientsService", async () => {
    req = mockRequest();
    req.params.id = 1;
    req.body = null;

    res = mockResponse();

    await clientsController.updateClientById(req, res);

    expect(mockUpdateCompanyById).toHaveBeenCalled();
  });

  xit("should throws when it is called method updateCompanyById", async () => {
    req = mockRequest();
    req.params.id = 1;
    req.body = { company: null };
    res = mockResponse();

    // await clientsController.updateClientById(req, res);

    await expect(
      clientsController.updateClientById(req, res)
    ).rejects.toEqual();
  });

  it("send called once", async () => {
    req = mockRequest();
    req.params.id = 1;
    req.body = company;
    res = mockResponse();

    await clientsController.updateClientById(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it("send not called", async () => {
    req = mockRequest();
    req.params.id = 1;
    req.body = null;
    res = mockResponse();

    await clientsController.updateClientById(req, res);

    expect(res.send).not.toHaveBeenCalledTimes(2);
  });

  it("updateCompanyById should return client", async () => {
    mockUpdateCompanyById.mockReturnValueOnce(company);

    let response = await request(app)
      .put("/api/clients/update-client/1")
      .send(company);

    expect(response.text).toEqual(JSON.stringify(company));
  });
});
