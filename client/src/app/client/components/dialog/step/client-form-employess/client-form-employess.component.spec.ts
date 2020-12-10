import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientFormEmployessComponent } from './client-form-employess.component';

describe('ClientFormEmployessComponent', () => {
  let component: ClientFormEmployessComponent;
  let fixture: ComponentFixture<ClientFormEmployessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormEmployessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormEmployessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
