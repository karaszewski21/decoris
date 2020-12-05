import { browser, by, element } from "protractor";

export class ClientDialogPage {
  buttonNewClient = element(by.buttonText("Nowy klient"));
  navigateTo(): Promise<unknown> {
    return browser.get("client") as Promise<unknown>;
  }

  openDialog() {
    return element(
      by.xpath(
        "/html/body/app-root/div/section/app-client/div/app-client-nav-actions/div/button[1]"
      )
    );
  }

  getTitle() {
    element(by.css("dialog-title__name")).getText();
  }
}
