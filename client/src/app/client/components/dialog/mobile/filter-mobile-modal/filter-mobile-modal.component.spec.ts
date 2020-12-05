import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMobileModalComponent } from './filter-mobile-modal.component';

describe('FilterMobileModalComponent', () => {
  let component: FilterMobileModalComponent;
  let fixture: ComponentFixture<FilterMobileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMobileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMobileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
