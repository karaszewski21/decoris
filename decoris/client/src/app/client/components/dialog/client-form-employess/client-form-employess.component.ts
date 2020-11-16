import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Employee } from "../../../../interfaces/client";

@Component({
  selector: "app-client-form-employess",
  templateUrl: "./client-form-employess.component.html",
  styleUrls: ["./client-form-employess.component.scss"],
})
export class ClientFormEmployessComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() selectedEmployeeList: Map<string, Employee>;
  @Input() positionEmployeeList: string[];
  @Input() positionEmployeeControl: FormControl;
  @Output() updateEmployeeEvent = new EventEmitter<string>();
  @Output() removeEmployeeEvent = new EventEmitter<string>();
  @Output() addEmployeeEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addEmployee() {
    this.addEmployeeEvent.emit();
  }

  updateEmployee(employeeId) {
    this.updateEmployeeEvent.emit(employeeId);
  }

  removeEmployee(employeeId) {
    this.removeEmployeeEvent.emit(employeeId);
  }
}
