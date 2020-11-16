import { ClientDialogPage } from "./client-dialog.po";
import { browser, logging } from "protractor";

describe("workspace-project App", () => {
  let page: ClientDialogPage;

  beforeEach(() => {
    page = new ClientDialogPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    page
      .openDialog()
      .click()
      .then(() => {
        expect(page.getTitle()).toEqual("Nowy klient");
      });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
