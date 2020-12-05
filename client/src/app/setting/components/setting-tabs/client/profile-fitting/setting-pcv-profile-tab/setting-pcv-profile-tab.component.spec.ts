import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPcvProfileTabComponent } from './setting-pcv-profile-tab.component';

describe('SettingPcvProfileTabComponent', () => {
  let component: SettingPcvProfileTabComponent;
  let fixture: ComponentFixture<SettingPcvProfileTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPcvProfileTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPcvProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
