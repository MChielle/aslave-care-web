import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestockReportComponent } from './restock-report.component';

describe('RestockReportComponent', () => {
  let component: RestockReportComponent;
  let fixture: ComponentFixture<RestockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestockReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
