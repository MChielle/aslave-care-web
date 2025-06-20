import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisterOutStockComponent } from './view-register-out-stock.component';

describe('ViewRegisterOutStockComponent', () => {
  let component: ViewRegisterOutStockComponent;
  let fixture: ComponentFixture<ViewRegisterOutStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegisterOutStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRegisterOutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
