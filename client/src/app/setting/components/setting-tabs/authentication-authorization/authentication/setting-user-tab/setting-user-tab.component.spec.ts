import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUserTabComponent } from './setting-user-tab.component';

describe('SettingUserTabComponent', () => {
  let component: SettingUserTabComponent;
  let fixture: ComponentFixture<SettingUserTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingUserTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUserTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
