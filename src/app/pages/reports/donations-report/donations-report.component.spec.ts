import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsReportComponent } from './donations-report.component';

describe('DonationsReportComponent', () => {
  let component: DonationsReportComponent;
  let fixture: ComponentFixture<DonationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
