import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBaseModalComponent } from './client-base-modal.component';

describe('ClientBaseModalComponent', () => {
  let component: ClientBaseModalComponent;
  let fixture: ComponentFixture<ClientBaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBaseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
