import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { UserType } from "app/shared/enums/role.enum";
import { CreateEmployeeModel } from "app/shared/models/employee/create-employee.model";
import { EmployeeModel } from "app/shared/models/employee/employee.model";
import { CreateManagerModel } from "app/shared/models/manager/create-manager.model";
import { ManagerModel } from "app/shared/models/manager/manager.model";
import { RoleModel } from "app/shared/models/role/role.model";
import { SignUpGenericModel } from "app/shared/models/signup/signup-generic.model";
import { UserModel } from "app/shared/models/user/user.model";
import { ViewUserModel } from "app/shared/models/user/view-user.model";
import { EmployeeService } from "app/shared/services/employee/employee.service";
import { ManagerService } from "app/shared/services/manager/manager.service";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RoleService } from "app/shared/services/role/role.service";
import { UserService } from "app/shared/services/user/user.service";
import { ValidatorHelper } from "app/shared/utils/helpers/validator.helper";
import { UserNames } from "app/shared/utils/names";
declare var $: any;

type UserFields =
  | "userId"
  | "name"
  | "email"
  | "phoneNumber"
  | "userType"
  | "password"
  | "repeatPassword";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent implements OnInit {
  public propertyLenght;
  public user: ViewUserModel;
  public roles: RoleModel[] = [];
  public createForm: FormGroup;
  public formErrors: FormErrors = {
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    userType: "",
    password: "",
    repeatPassword: "",
  };

  constructor(
    private names: UserNames,
    private router: Router,
    private roleService: RoleService<RoleModel>,
    private userService: UserService<UserModel>,
    private employeeService: EmployeeService<EmployeeModel>,
    private managerService: ManagerService<ManagerModel>,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
    this.propertyLenght = PropertyLenghtConstants;
  }

  showNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  loadRoles() {
    this.roleService.getToList().subscribe((response) => {
      if (response.isSuccess) this.roles = response.data;
      console.log("Roles: ", this.roles);
    });
  }

  initForm() {
    this.createForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        ValidatorHelper.isValidEmail,
      ]),
      phoneNumber: new FormControl("", [Validators.required]),
      userType: new FormControl("", [Validators.required]),
      password: new FormControl(""),
      repeatPassword: new FormControl(""),
    });
  }

  BuildManagerUser(view: ViewUserModel): CreateManagerModel {
    let manager = new CreateManagerModel();
    manager.signUp = new SignUpGenericModel();
    manager.signUp.name = view.name;
    manager.signUp.email = view.email;
    manager.signUp.phoneNumber = view.phoneNumber;
    manager.signUp.password = view.password;
    return manager;
  }

  BuildEmployeeUser(view: ViewUserModel): CreateEmployeeModel {
    let employee = new CreateEmployeeModel();
    employee.signUp = new SignUpGenericModel();
    employee.signUp.name = view.name;
    employee.signUp.email = view.email;
    employee.signUp.phoneNumber = view.phoneNumber;
    employee.signUp.password = view.password;
    return employee;
  }

  sendCreateManagerRequest(manager: CreateManagerModel) {
    console.log({manager});
    this.managerService.create(manager).subscribe((response) => {
      if (response.isSuccess)
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    });
  }

  sendCreateEmployeeRequest(employee: CreateEmployeeModel) {
    console.log({employee});
    this.employeeService.create(employee).subscribe((response) => {
      if (response.isSuccess)
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    });
  }

  create() {
    const model = this.createForm.value as ViewUserModel;
    const parameters = new UserModel();
    parameters.email = model.email;
    this.userService.getByParameters(parameters).subscribe((response) => {
      if (!response.isSuccess) {
        this.showNotification("Erro, não foi possível consultar email.");
        return;
      }

      if (response?.data[0]) {
        this.showNotification(
          "Conflito, este email pertence a outro cadastro."
        );
        return;
      }

      console.log(model);
      console.log(this.createForm.valid);
      console.log(this.createForm.controls.userType.value);
      console.log(this.createForm.controls.email.errors);
      console.log(this.createForm.controls.name.errors);
      console.log(this.createForm.controls.phoneNumber.errors);
      console.log(this.createForm.controls.password.errors);
      console.log(this.createForm.controls.repeatPassword.errors);
      console.log(this.createForm.controls.userType.errors);
      if (this.createForm.valid) {
        if (UserType[this.createForm.controls.userType.value] == UserType[UserType.Manager])
          this.sendCreateManagerRequest(this.BuildManagerUser(model));
        if (UserType[this.createForm.controls.userType.value] == UserType[UserType.Employee])
          this.sendCreateEmployeeRequest(this.BuildEmployeeUser(model));
        return;
      }
    });
  }
  catch(error) {
    console.log("create", error);
  }

  cancel() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }
}
