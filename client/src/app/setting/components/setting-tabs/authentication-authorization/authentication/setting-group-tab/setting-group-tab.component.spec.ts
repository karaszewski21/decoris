import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGroupTabComponent } from './setting-group-tab.component';

describe('SettingGroupTabComponent', () => {
  let component: SettingGroupTabComponent;
  let fixture: ComponentFixture<SettingGroupTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingGroupTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingGroupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
