import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../../interfaces/account/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() showLogout: boolean;
  @Input() user: User;
  @Output() openMenuEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  logout() {
    this.logoutEvent.emit();
  }

  openMenu() {
    this.openMenuEvent.emit();
  }
}
