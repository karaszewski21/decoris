import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientPaginatorComponent } from './client-paginator.component';

describe('ClientPaginatorComponent', () => {
  let component: ClientPaginatorComponent;
  let fixture: ComponentFixture<ClientPaginatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
