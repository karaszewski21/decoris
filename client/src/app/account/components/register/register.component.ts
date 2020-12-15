import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  @Input() registerFormGroup: FormGroup;
  @Output() registerEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  register() {
    this.registerEvent.emit();
  }
}
