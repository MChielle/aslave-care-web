import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { StockModel } from "app/shared/models/stock/stock.model";
import { StockService } from "app/shared/services/stock/stock.service";
import { RegistersNames, StockNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-stock",
  templateUrl: "./stocks.component.html",
  styleUrls: ["./stocks.component.scss"],
})
export class StockComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<StockModel>;
  public stocks: StockModel[];
  public displayedColumns: string[] = [
    "name",
    "stockTypeId",
    "quantity",
    "quantityLowWarning",
    "disable",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private names: StockNames,
    private registersNames: RegistersNames,
    private service: StockService<StockModel>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.reloadDataSource();
    this.propertyLenght = PropertyLenghtConstants;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAll() {
    firstValueFrom(this.service.getToList())
      .then((response) => {
        if (response.isSuccess) {
          this.stocks = response.data;
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<StockModel>(this.stocks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createNew() {
    this.router.navigate([`create-${this.names.URL_LOWER_CASE}`]);
  }

  softDelete(id: string) {
    console.log(id);
    firstValueFrom(this.service.softDelete(id))
      .then((response) => {
        this.stocks = this.stocks.filter((x) => x.id !== id);
        this.reloadDataSource();
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

  update(id: string) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, id]);
  }

  registers() {
    this.router.navigate([this.registersNames.URL_LOWER_CASE_PLURAL]);
  }
}
