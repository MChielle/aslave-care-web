import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToRestockReport(){
    this.router.navigate([`restock-report`]);
  }

  navigateToDonationReport(){
    this.router.navigate([`donations-report`]);
  }

  navigateToStockReport(){
    this.router.navigate([`stock-report`]);
  }
}
