import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-calendar",
  templateUrl: "./dialog-calendar.component.html",
  styleUrls: ["./dialog-calendar.component.scss"],
})
export class DialogCalendarComponent implements OnInit {
  selectedDate: string;
  @Output() dateChangeEvent = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedDate = data.createDate;
  }

  ngOnInit(): void {}

  dateChanged(data) {
    this.dialogRef.close(data);
  }

  onCloseClick() {
    this.dialogRef.close(null);
  }
}
