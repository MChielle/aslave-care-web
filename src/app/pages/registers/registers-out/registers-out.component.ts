import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { ViewRegisterOutModel } from "app/shared/models/register-out/view-register-out.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { FormatHelper } from "app/shared/utils/helpers/format.helper";
import { RegisterOutNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

declare var $: any;

@Component({
  selector: "app-registers-out",
  templateUrl: "./registers-out.component.html",
  styleUrls: ["./registers-out.component.scss"],
})
export class RegistersOutComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<ViewRegisterOutModel>;
  public registersOut: ViewRegisterOutModel[];
  public displayedColumns: string[] = [
    "number",
    "apply",
    "formattedApplyDate",
    "description",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private names: RegisterOutNames,
    private service: RegisterOutService<RegisterOutModel>,
    private router: Router,
    private notificationService: NotificationService,
    private formatHelper: FormatHelper
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
          this.registersOut = response.data.map(
            (registerOut) =>
              new ViewRegisterOutModel(this.formatHelper, registerOut)
          );
          this.registersOut = this.sortByNumber(this.registersOut, false);
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByNumber(
    models: ViewRegisterOutModel[],
    ascendent: boolean
  ): ViewRegisterOutModel[] {
    return ascendent
      ? models.sort((a, b) => a.number - b.number)
      : models.sort((a, b) => b.number - a.number);
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<ViewRegisterOutModel>(
      this.registersOut
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  softDelete(id: string) {
    firstValueFrom(this.service.softDelete(id))
      .then((response) => {
        console.log(response);
        this.registersOut = this.registersOut.filter((x) => x.id !== id);
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

  navigateToUpdate(registerOut: RegisterOutModel) {
    if (registerOut.apply) {
      this.showNotification("Registro aplicado não pode ser alterado.");
      return;
    }
    this.router.navigate([
      `update-${this.names.URL_LOWER_CASE}`,
      registerOut.id,
    ]);
  }

  navigateToView(registerOut: RegisterOutModel) {
    this.router.navigate([`view-${this.names.URL_LOWER_CASE}`, registerOut.id]);
  }
}
