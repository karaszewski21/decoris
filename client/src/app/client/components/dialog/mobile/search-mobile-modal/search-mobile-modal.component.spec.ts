import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMobileModalComponent } from './search-mobile-modal.component';

describe('SearchMobileModalComponent', () => {
  let component: SearchMobileModalComponent;
  let fixture: ComponentFixture<SearchMobileModalComponent>;

  beforeEach(async(() => {
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
