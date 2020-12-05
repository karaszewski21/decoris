import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormNotesComponent } from './client-form-notes.component';

describe('ClientFormNotesComponent', () => {
  let component: ClientFormNotesComponent;
  let fixture: ComponentFixture<ClientFormNotesComponent>;

  beforeEach(async(() => {
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
