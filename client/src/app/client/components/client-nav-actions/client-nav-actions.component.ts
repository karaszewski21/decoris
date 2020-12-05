import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-client-nav-actions",
  templateUrl: "./client-nav-actions.component.html",
  styleUrls: ["./client-nav-actions.component.scss"],
})
export class ClientNavActionsComponent implements OnInit {
  @Output() openNewClientModalEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  openNewClientModal() {
    this.openNewClientModalEvent.emit();
  }
}
