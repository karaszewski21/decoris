import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CountryEnum } from "../../../core/enums/client/countries";

@Component({
  selector: "app-client-nav-market",
  templateUrl: "./client-nav-market.component.html",
  styleUrls: ["./client-nav-market.component.scss"],
})
export class ClientNavMarketComponent implements OnInit {
  @Output() selectedMarketEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  selectedMarket(nameMarket: string) {
    switch (nameMarket) {
      case "polish":
        this.selectedMarketEvent.emit(CountryEnum.polish);
        break;
      case "foreign":
        this.selectedMarketEvent.emit(CountryEnum.foreign);
        break;
      case "all":
        this.selectedMarketEvent.emit(CountryEnum.all);
        break;
    }
  }
}
