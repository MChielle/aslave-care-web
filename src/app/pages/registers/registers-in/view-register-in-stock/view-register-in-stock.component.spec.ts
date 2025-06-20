import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisterInStockComponent } from './view-register-in-stock.component';

describe('ViewRegisterInStockComponent', () => {
  let component: ViewRegisterInStockComponent;
  let fixture: ComponentFixture<ViewRegisterInStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegisterInStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRegisterInStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
