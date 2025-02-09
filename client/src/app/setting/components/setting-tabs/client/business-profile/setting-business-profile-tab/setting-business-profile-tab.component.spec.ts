import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingBusinessProfileTabComponent } from './setting-business-profile-tab.component';

describe('SettingBusinessProfileTabComponent', () => {
  let component: SettingBusinessProfileTabComponent;
  let fixture: ComponentFixture<SettingBusinessProfileTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingBusinessProfileTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBusinessProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
