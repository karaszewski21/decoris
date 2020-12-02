import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Output() navigatorEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  navigate(route: string) {
    this.navigatorEvent.emit(route);
  }
}
