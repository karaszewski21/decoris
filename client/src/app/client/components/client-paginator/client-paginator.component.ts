import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-client-paginator",
  templateUrl: "./client-paginator.component.html",
  styleUrls: ["./client-paginator.component.scss"],
})
export class ClientPaginatorComponent implements OnInit, OnChanges {
  @Input() totalCountCompanyPaginator: number;
  @Input() pageSizePaginator: number;
  @Input() pageSizeOptionsPaginator: number[];
  @Input() resetPaginator: boolean;

  @Output() paginatorEvent = new EventEmitter<PageEvent>();
  @Output() getParametersPaginatorEvent = new EventEmitter();

  @ViewChild(MatPaginator) paginatorPointer: MatPaginator;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.resetPaginator) {
      this.paginatorPointer.firstPage();
    }
  }

  ngOnInit(): void {}

  paginator(pageEvent: PageEvent) {
    this.paginatorEvent.emit(pageEvent);
  }
}
