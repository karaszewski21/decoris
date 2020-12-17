import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAccountTabComponent } from './setting-account-tab.component';

describe('SettingAccountTabComponent', () => {
  let component: SettingAccountTabComponent;
  let fixture: ComponentFixture<SettingAccountTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAccountTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
