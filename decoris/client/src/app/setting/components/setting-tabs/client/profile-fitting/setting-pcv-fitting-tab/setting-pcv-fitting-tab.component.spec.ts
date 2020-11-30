import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPcvFittingTabComponent } from './setting-pcv-fitting-tab.component';

describe('SettingPcvFittingTabComponent', () => {
  let component: SettingPcvFittingTabComponent;
  let fixture: ComponentFixture<SettingPcvFittingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPcvFittingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPcvFittingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
