import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientFormLocationComponent } from './client-form-location.component';

describe('ClientFormLocationComponent', () => {
  let component: ClientFormLocationComponent;
  let fixture: ComponentFixture<ClientFormLocationComponent>;

  beforeEach(waitForAsync(() => {
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
