import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingCityTabComponent } from './setting-city-tab.component';

describe('SettingCityTabComponent', () => {
  let component: SettingCityTabComponent;
  let fixture: ComponentFixture<SettingCityTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCityTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
