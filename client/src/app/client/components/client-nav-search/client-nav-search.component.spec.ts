import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientNavSearchComponent } from './client-nav-search.component';

describe('ClientNavSearchComponent', () => {
  let component: ClientNavSearchComponent;
  let fixture: ComponentFixture<ClientNavSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNavSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
