import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegisterInStockComponent } from './create-register-in-stock.component';

describe('CreateRegisterInStockComponent', () => {
  let component: CreateRegisterInStockComponent;
  let fixture: ComponentFixture<CreateRegisterInStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRegisterInStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegisterInStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
