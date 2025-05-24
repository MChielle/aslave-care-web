import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { UserProfileModel } from "app/shared/models/user/user-profile.model";
import { SignInService } from "app/shared/services/sign-in/sign-in.service";
import { UserService } from "app/shared/services/user/user.service";
import { FormatHelper } from "app/shared/utils/helpers/format.helper";
import { UserNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<UserProfileModel>;
  public users: UserProfileModel[];
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
    private names: UserNames,
    private service: SignInService<UserProfileModel>,
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
    firstValueFrom(this.service.getAnyToList())
      .then((response) => {
        if (response.isSuccess) {
          this.users = response.data;
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<UserProfileModel>(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
