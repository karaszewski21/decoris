import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchMobileModalComponent } from './search-mobile-modal.component';

describe('SearchMobileModalComponent', () => {
  let component: SearchMobileModalComponent;
  let fixture: ComponentFixture<SearchMobileModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMobileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMobileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
