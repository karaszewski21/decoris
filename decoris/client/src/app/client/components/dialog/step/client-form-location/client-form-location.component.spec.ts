import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormLocationComponent } from './client-form-location.component';

describe('ClientFormLocationComponent', () => {
  let component: ClientFormLocationComponent;
  let fixture: ComponentFixture<ClientFormLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
