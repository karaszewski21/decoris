import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNavActionsComponent } from './client-nav-actions.component';

describe('ClientNavActionsComponent', () => {
  let component: ClientNavActionsComponent;
  let fixture: ComponentFixture<ClientNavActionsComponent>;

  beforeEach(async(() => {
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
