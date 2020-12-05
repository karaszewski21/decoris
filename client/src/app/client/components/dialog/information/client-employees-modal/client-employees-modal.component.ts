import { Component, OnInit, Inject } from "@angular/core";
import { Employee } from "../../../../../interfaces/client";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-client-employees-modal",
  templateUrl: "./client-employees-modal.component.html",
  styleUrls: ["./client-employees-modal.component.scss"],
})
export class ClientEmployeesModalComponent implements OnInit {
  employees: Employee[];
  constructor(
    public dialogRef: MatDialogRef<ClientEmployeesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employees = data.employees;
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
