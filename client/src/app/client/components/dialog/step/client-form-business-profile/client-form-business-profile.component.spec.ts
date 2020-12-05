import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormBusinessProfileComponent } from './client-form-business-profile.component';

describe('ClientFormBusinessProfileComponent', () => {
  let component: ClientFormBusinessProfileComponent;
  let fixture: ComponentFixture<ClientFormBusinessProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormBusinessProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
