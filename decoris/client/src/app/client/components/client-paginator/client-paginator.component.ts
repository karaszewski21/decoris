import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-client-paginator",
  templateUrl: "./client-paginator.component.html",
  styleUrls: ["./client-paginator.component.scss"],
})
export class ClientPaginatorComponent implements OnInit {
  @Input() totalCountCompanyPaginator: number;
  @Input() pageSizePaginator: number;
  @Input() pageSizeOptionsPaginator: number[];

  @Output() paginatorEvent = new EventEmitter<PageEvent>();
  @Output() getParametersPaginatorEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    //  this.getParametersPaginatorEvent.emit();
  }

  paginator(pageEvent: PageEvent) {
    this.paginatorEvent.emit(pageEvent);
  }
}
