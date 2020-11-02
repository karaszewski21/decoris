import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNavFiltersComponent } from './client-nav-filters.component';

describe('ClientNavFiltersComponent', () => {
  let component: ClientNavFiltersComponent;
  let fixture: ComponentFixture<ClientNavFiltersComponent>;

  beforeEach(async(() => {
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
