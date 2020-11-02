import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  AfterViewInit,
  Injector,
  Injectable,
} from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  DialogPosition,
} from "@angular/material/dialog";
import { Client } from "../../../client/components/client-new-modal/client-new-modal.component";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit, AfterViewInit {
  clientInjector: Injector;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector
  ) {
    this.clientInjector = Injector.create({
      providers: [{ provide: Client, deps: [] }],
      parent: injector,
    });
  }

  ngAfterViewInit(): void {}

  CloseDialog() {
    this.dialogRef.close();
  }

  SaveAndCloseDialog() {
    const client: Client = this.clientInjector.get(Client);
    this.dialogRef.close(client);
  }

  ngOnInit(): void {}
}
