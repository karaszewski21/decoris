import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientFormFittingsProfilesComponent } from './client-form-fittings-profiles.component';

describe('ClientFormFittingsProfilesComponent', () => {
  let component: ClientFormFittingsProfilesComponent;
  let fixture: ComponentFixture<ClientFormFittingsProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormFittingsProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormFittingsProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
