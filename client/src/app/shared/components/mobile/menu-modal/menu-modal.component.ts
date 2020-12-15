import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MenuEnum } from "src/app/core/enums/shared/menu";

@Component({
  selector: "app-menu-modal",
  templateUrl: "./menu-modal.component.html",
  styleUrls: ["./menu-modal.component.scss"],
})
export class MenuModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  selectedOption(option: string) {
    this.dialogRef.close(option);
  }
}
