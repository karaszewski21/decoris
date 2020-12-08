import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Note } from "../../../../../interfaces/client";

@Component({
  selector: "app-client-form-notes",
  templateUrl: "./client-form-notes.component.html",
  styleUrls: ["./client-form-notes.component.scss"],
})
export class ClientFormNotesComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() selectedNoteList: Map<string, Note>;
  @Output() updateNoteEvent = new EventEmitter<string>();
  @Output() removeNoteEvent = new EventEmitter<string>();
  @Output() addNoteEvent = new EventEmitter();
  @Output() updateDateNoteEvent = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedNoteList);
  }

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
  updateDateNote(text, date) {
    this.updateDateNoteEvent.emit({ text: text, date: date });
  }
}
