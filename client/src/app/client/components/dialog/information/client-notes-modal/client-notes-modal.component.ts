import { Component, OnInit, Input, Inject } from "@angular/core";
import { Note } from "../../../../../interfaces/client";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-client-notes-modal",
  templateUrl: "./client-notes-modal.component.html",
  styleUrls: ["./client-notes-modal.component.scss"],
})
export class ClientNotesModalComponent implements OnInit {
  notes: Note[];
  constructor(
    public dialogRef: MatDialogRef<ClientNotesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.notes = data.notes;
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
