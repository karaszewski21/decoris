import { Component, OnInit, Inject } from "@angular/core";
import { Company } from "src/app/interfaces/client";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-client-base-modal",
  templateUrl: "./client-base-modal.component.html",
  styleUrls: ["./client-base-modal.component.scss"],
})
export class ClientBaseModalComponent implements OnInit {
  company: Company;
  constructor(
    public dialogRef: MatDialogRef<ClientBaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.company = data.company;
  }

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
