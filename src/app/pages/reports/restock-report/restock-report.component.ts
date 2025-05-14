import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestockReportModel } from 'app/shared/models/report/restock-report.model';
import { StockModel } from 'app/shared/models/stock/stock.model';
import { StockService } from 'app/shared/services/stock/stock.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-restock-report',
  templateUrl: './restock-report.component.html',
  styleUrls: ['./restock-report.component.scss']
})
export class RestockReportComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<RestockReportModel>;
  public stocks: StockModel[];
  public displayedColumns: string[] = [
    "name",
    "supplierName",
    "stockTypeId",
    "quantity",
    "lowerPrice", 
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: StockService<StockModel>,
  ) { }

  ngOnInit(): void {
    this.getRestockReport();
  }

  getRestockReport(){
    firstValueFrom(this.service.getRestockReport())
      .then((response) => {
        console.log(response);
        if (response.isSuccess) {
          this.stocks = response.data;
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  downloadRestockReport(){
  }

  reloadDataSource() {
    let source = this.stocks.map(x => new RestockReportModel(
      x.name,
      x.registerInStocks[0].registerIn.supplier.name,
      x.stockTypeId,
      x.quantity,
      x.registerInStocks[0].price
    ));

    this.dataSource = new MatTableDataSource<RestockReportModel>(source);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
