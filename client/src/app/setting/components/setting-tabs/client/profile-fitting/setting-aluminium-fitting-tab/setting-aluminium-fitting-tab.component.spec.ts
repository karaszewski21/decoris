import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAluminiumFittingTabComponent } from './setting-aluminium-fitting-tab.component';

describe('SettingAluminiumFittingTabComponent', () => {
  let component: SettingAluminiumFittingTabComponent;
  let fixture: ComponentFixture<SettingAluminiumFittingTabComponent>;

  beforeEach(async(() => {
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
