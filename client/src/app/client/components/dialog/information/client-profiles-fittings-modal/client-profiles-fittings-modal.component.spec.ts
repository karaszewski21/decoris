import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfilesFittingsModalComponent } from './client-profiles-fittings-modal.component';

describe('ClientProfilesFittingsModalComponent', () => {
  let component: ClientProfilesFittingsModalComponent;
  let fixture: ComponentFixture<ClientProfilesFittingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProfilesFittingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfilesFittingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
