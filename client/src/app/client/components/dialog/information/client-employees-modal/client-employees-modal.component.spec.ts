import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientEmployeesModalComponent } from './client-employees-modal.component';

describe('ClientEmployeesModalComponent', () => {
  let component: ClientEmployeesModalComponent;
  let fixture: ComponentFixture<ClientEmployeesModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEmployeesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
