import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingAluminiumFittingTabComponent } from './setting-aluminium-fitting-tab.component';

describe('SettingAluminiumFittingTabComponent', () => {
  let component: SettingAluminiumFittingTabComponent;
  let fixture: ComponentFixture<SettingAluminiumFittingTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAluminiumFittingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAluminiumFittingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
