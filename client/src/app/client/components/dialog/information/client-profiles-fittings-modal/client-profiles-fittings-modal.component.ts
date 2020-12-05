import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  AluminiumProfile,
  AluminiumFitting,
  PcvProfile,
  PcvFitting,
} from "../../../../../interfaces/client";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-client-profiles-fittings-modal",
  templateUrl: "./client-profiles-fittings-modal.component.html",
  styleUrls: ["./client-profiles-fittings-modal.component.scss"],
})
export class ClientProfilesFittingsModalComponent implements OnInit {
  aluminiumProfiles: AluminiumProfile[];
  aluminiumFittings: AluminiumFitting[];
  pcvProfiles: PcvProfile[];
  pcvFittings: PcvFitting[];
  constructor(
    public dialogRef: MatDialogRef<ClientProfilesFittingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.aluminiumProfiles = data.aluminiumProfiles;
    this.aluminiumFittings = data.aluminiumFittings;
    this.pcvProfiles = data.pcvProfiles;
    this.pcvFittings = data.pcvFittings;
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
