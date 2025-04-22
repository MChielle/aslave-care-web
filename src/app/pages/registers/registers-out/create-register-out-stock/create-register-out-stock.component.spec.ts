import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegisterOutStockComponent } from './create-register-out-stock.component';

describe('CreateRegisterOutStockComponent', () => {
  let component: CreateRegisterOutStockComponent;
  let fixture: ComponentFixture<CreateRegisterOutStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRegisterOutStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegisterOutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
