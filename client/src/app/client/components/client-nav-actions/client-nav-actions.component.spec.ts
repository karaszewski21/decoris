import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientNavActionsComponent } from './client-nav-actions.component';

describe('ClientNavActionsComponent', () => {
  let component: ClientNavActionsComponent;
  let fixture: ComponentFixture<ClientNavActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNavActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
