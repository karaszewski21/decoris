import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingTabsComponent } from './setting-tabs.component';

describe('SettingTabsComponent', () => {
  let component: SettingTabsComponent;
  let fixture: ComponentFixture<SettingTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
