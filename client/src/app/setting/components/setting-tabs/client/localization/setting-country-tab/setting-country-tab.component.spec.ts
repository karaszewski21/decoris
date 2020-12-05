import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCountryTabComponent } from './setting-country-tab.component';

describe('SettingCountryTabComponent', () => {
  let component: SettingCountryTabComponent;
  let fixture: ComponentFixture<SettingCountryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCountryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCountryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
