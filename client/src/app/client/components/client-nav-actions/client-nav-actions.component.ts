import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-client-nav-actions",
  templateUrl: "./client-nav-actions.component.html",
  styleUrls: ["./client-nav-actions.component.scss"],
})
export class ClientNavActionsComponent implements OnInit {
  @Output() openNewClientModalEvent = new EventEmitter();
  @Output() exportClientsEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  openNewClientModal() {
    this.openNewClientModalEvent.emit();
  }

  exportClients() {
    this.exportClientsEvent.emit("csv");
  }
}
