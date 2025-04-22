/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegisterOutStockComponent } from './update-register-out-stock.component';

describe('EditRegisterOutStockComponent', () => {
  let component: UpdateRegisterOutStockComponent;
  let fixture: ComponentFixture<UpdateRegisterOutStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRegisterOutStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRegisterOutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
