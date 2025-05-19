import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterInModel } from "app/shared/models/register-in/register-in.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterInService } from "app/shared/services/register-in/register-in.service";
import { RegisterInNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

declare var $: any;

@Component({
  selector: "app-registers-in",
  templateUrl: "./registers-in.component.html",
  styleUrls: ["./registers-in.component.scss"],
})
export class RegistersInComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<RegisterInModel>;
  public registersIn: RegisterInModel[];
  public displayedColumns: string[] = [
    "number",
    "name",
    "apply",
    "donation",
    "date",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private names: RegisterInNames,
    private service: RegisterInService<RegisterInModel>,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  showNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

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
        if (response.isSuccess && response.data[0]) {
          this.registersIn = response.data;
          this.registersIn = this.sortByNumber(this.registersIn, false);
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByNumber(
    models: RegisterInModel[],
    ascendent: boolean
  ): RegisterInModel[] {
    return ascendent
      ? models.sort((a, b) => a.number - b.number)
      : models.sort((a, b) => b.number - a.number);
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<RegisterInModel>(this.registersIn);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  softDelete(id: string) {
    firstValueFrom(this.service.softDelete(id))
      .then((response) => {
        this.registersIn = this.registersIn.filter((x) => x.id !== id);
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

  navigateToUpdate(registerIn: RegisterInModel) {
    if (registerIn.apply) {
      this.showNotification("Registro aplicado não pode ser alterado.");
      return;
    }
    this.router.navigate([
      `update-${this.names.URL_LOWER_CASE}`,
      registerIn.id,
    ]);
  }
}
