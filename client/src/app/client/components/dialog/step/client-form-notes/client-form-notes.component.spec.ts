import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientFormNotesComponent } from './client-form-notes.component';

describe('ClientFormNotesComponent', () => {
  let component: ClientFormNotesComponent;
  let fixture: ComponentFixture<ClientFormNotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
