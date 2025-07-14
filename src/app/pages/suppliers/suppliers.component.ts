import { Component, OnInit, ViewChild } from "@angular/core";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { SupplierService } from "../../shared/services/supplier/supplier.service";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { FormatHelper } from "../../shared/utils/helpers/format.helper";
import { SupplierNames } from "app/shared/utils/names";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { MatTableDataSource } from "@angular/material/table";
import { ViewSupplierModel } from "app/shared/models/supplier/view-supplier.model";

@Component({
  selector: "app-supplier",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  public showLoader = false;
  public propertyLenght;
  public dataSource: MatTableDataSource<ViewSupplierModel>;
  public suppliers: ViewSupplierModel[];
  public displayedColumns: string[] = [
    "name",
    "email",
    "phoneNumber",
    "disable",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private names: SupplierNames,
    private service: SupplierService<SupplierModel>,
    private router: Router,
    private formatHelper: FormatHelper
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
    this.showLoader = true;
    firstValueFrom(this.service.getToList())
      .then((response) => {
        if (response.isSuccess) {
          this.suppliers = response.data.map((supplier) => {
            return new ViewSupplierModel(this.formatHelper, supplier);
          });
          this.reloadDataSource();
          this.showLoader = false;
        }
      })
      .catch((error) => {
        this.showLoader = false;
        console.log(error);
      });
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<ViewSupplierModel>(this.suppliers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  softDelete(id: string) {
    console.log(id);
    firstValueFrom(this.service.softDelete(id))
      .then((response) => {
        this.suppliers = this.suppliers.filter((x) => x.id !== id);
        this.reloadDataSource();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToCreate() {
    this.router.navigate([`create-${this.names.URL_LOWER_CASE}`]);
  }

  navigateToUpdate(id: string) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, id]);
  }

  phoneNumberFormatter(phoneNumber: string) {
    return this.formatHelper.phoneNumberFormatter(phoneNumber);
  }
}
