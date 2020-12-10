import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientNotesModalComponent } from './client-notes-modal.component';

describe('ClientNotesModalComponent', () => {
  let component: ClientNotesModalComponent;
  let fixture: ComponentFixture<ClientNotesModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNotesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNotesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
