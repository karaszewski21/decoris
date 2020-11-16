import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-client-nav-market",
  templateUrl: "./client-nav-market.component.html",
  styleUrls: ["./client-nav-market.component.scss"],
})
export class ClientNavMarketComponent implements OnInit {
  @Output() selectedMarketEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {

  }

  selectedMarket(nameMarket: string) {
    this.selectedMarketEvent.emit(nameMarket);
  }
}
