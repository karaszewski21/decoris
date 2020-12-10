import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingPositionEmployeeTabComponent } from './setting-position-employee-tab.component';

describe('SettingPositionEmployeeTabComponent', () => {
  let component: SettingPositionEmployeeTabComponent;
  let fixture: ComponentFixture<SettingPositionEmployeeTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPositionEmployeeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPositionEmployeeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
