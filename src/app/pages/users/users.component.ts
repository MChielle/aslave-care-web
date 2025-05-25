import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { UserType } from "app/shared/enums/role.enum";
import { ViewUserModel } from "app/shared/models/user/view-user.model";
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
  public dataSource: MatTableDataSource<ViewUserModel>;
  public users: ViewUserModel[];
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
    private service: SignInService<ViewUserModel>,
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
          this.users = response.data.map((data) => {
            let profile = new ViewUserModel();
            profile.id = data.id;
            profile.name = data.user.name;
            profile.disable = data.user.disable;
            profile.email = data.user.email;
            profile.phoneNumber = this.formatHelper.phoneNumberFormatter(data.user.phoneNumber);
            profile.role = data.user.userRoles[0].role.userType
            profile.userId = data.userId;
            profile.user = data.user;
            return profile;
          });
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<ViewUserModel>(this.users);
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

  navigateToUpdate(id: string, role: UserType) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, {id, role}]);
  }

  phoneNumberFormatter(phoneNumber: string) {
    return this.formatHelper.phoneNumberFormatter(phoneNumber);
  }
}
