import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientFormBaseParametersComponent } from './client-form-base-parameters.component';

describe('ClientFormBaseParametersComponent', () => {
  let component: ClientFormBaseParametersComponent;
  let fixture: ComponentFixture<ClientFormBaseParametersComponent>;

  beforeEach(waitForAsync(() => {
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
