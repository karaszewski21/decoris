import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Note } from "../../../../interfaces/client";

@Component({
  selector: "app-client-form-notes",
  templateUrl: "./client-form-notes.component.html",
  styleUrls: ["./client-form-notes.component.scss"],
})
export class ClientFormNotesComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() noteList: Map<string, Note>;
  @Output() updateNoteEvent = new EventEmitter<string>();
  @Output() removeNoteEvent = new EventEmitter<string>();
  @Output() addNoteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  removeNote(text) {
    this.removeNoteEvent.emit(text);
  }

  updateNote(text) {
    this.updateNoteEvent.emit(text);
  }

  addNote() {
    this.addNoteEvent.emit();
  }
}
