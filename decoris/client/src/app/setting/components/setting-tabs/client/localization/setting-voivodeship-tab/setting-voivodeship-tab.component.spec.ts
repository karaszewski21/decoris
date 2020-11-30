import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingVoivodeshipTabComponent } from './setting-voivodeship-tab.component';

describe('SettingVoivodeshipTabComponent', () => {
  let component: SettingVoivodeshipTabComponent;
  let fixture: ComponentFixture<SettingVoivodeshipTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingVoivodeshipTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingVoivodeshipTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
