import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormBaseParametersComponent } from './client-form-base-parameters.component';

describe('ClientFormBaseParametersComponent', () => {
  let component: ClientFormBaseParametersComponent;
  let fixture: ComponentFixture<ClientFormBaseParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormBaseParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormBaseParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
