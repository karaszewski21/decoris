import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAluminiumProfileTabComponent } from './setting-aluminium-profile-tab.component';

describe('SettingAluminiumProfileTabComponent', () => {
  let component: SettingAluminiumProfileTabComponent;
  let fixture: ComponentFixture<SettingAluminiumProfileTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAluminiumProfileTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAluminiumProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
