import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNavMarketComponent } from './client-nav-market.component';

describe('ClientNavMarketComponent', () => {
  let component: ClientNavMarketComponent;
  let fixture: ComponentFixture<ClientNavMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNavMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
