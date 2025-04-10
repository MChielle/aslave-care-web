import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegistryInStockComponent } from './create-registry-in-stock.component';

describe('CreateRegistryInStockComponent', () => {
  let component: CreateRegistryInStockComponent;
  let fixture: ComponentFixture<CreateRegistryInStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRegistryInStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegistryInStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
