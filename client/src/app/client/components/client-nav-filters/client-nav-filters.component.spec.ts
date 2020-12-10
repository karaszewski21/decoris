import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientNavFiltersComponent } from './client-nav-filters.component';

describe('ClientNavFiltersComponent', () => {
  let component: ClientNavFiltersComponent;
  let fixture: ComponentFixture<ClientNavFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNavFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
