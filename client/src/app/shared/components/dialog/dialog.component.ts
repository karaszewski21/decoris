import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit, AfterViewInit {
  showConfirmButton: boolean = false;
  showRejectButton: boolean = false;
  showInformation: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.showConfirmButton = this.data.confirmButton.show;
    this.showRejectButton = this.data.confirmButton.show;
    this.showInformation = this.data.information.show;
  }
  ngAfterViewInit(): void {}

  closeDialog() {
    this.dialogRef.close(null);
  }

  replace() {
    this.dialogRef.close(true);
  }
  add() {
    this.dialogRef.close(false);
  }
}
