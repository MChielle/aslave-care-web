import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserType } from "app/shared/enums/role.enum";
import { EmployeeModel } from "app/shared/models/employee/employee.model";
import { ManagerModel } from "app/shared/models/manager/manager.model";
import { UserModel } from "app/shared/models/user/user.model";
import { ViewUserModel } from "app/shared/models/user/view-user.model";
import { EmployeeService } from "app/shared/services/employee/employee.service";
import { ManagerService } from "app/shared/services/manager/manager.service";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { UserService } from "app/shared/services/user/user.service";
import { ValidatorHelper } from "app/shared/utils/helpers/validator.helper";
import {
  EmployeeNames,
  ManagerNames,
  SignInNames,
  UserNames,
} from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

type UserFields =
  | "id"
  | "userId"
  | "name"
  | "email"
  | "phoneNumber"
  | "disable"
  | "role";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.scss"],
})
export class UpdateUserComponent implements OnInit {
  public userProfile: ViewUserModel;
  public updateForm: FormGroup;
  public formErrors: FormErrors = {
    id: "",
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    disable: "",
    role: "",
  };

  constructor(
    private names: UserNames,
    private managerNames: ManagerNames,
    private employeeNames: EmployeeNames,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService<UserModel>,
    private employeeService: EmployeeService<EmployeeModel>,
    private managerService: ManagerService<ManagerModel>,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  get id() {
    return this.updateForm.get("id").value;
  }
  get userId() {
    return this.updateForm.get("userId").value;
  }
  get name() {
    return this.updateForm.get("name").value;
  }
  get email() {
    return this.updateForm.get("email").value;
  }
  get phoneNumber() {
    return this.updateForm.get("phoneNumber").value;
  }
  get disable() {
    return this.updateForm.get("disable").value;
  }
  get role() {
    return this.updateForm.get("role").value;
  }

  buildForm() {
    this.updateForm = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        ValidatorHelper.isValidEmail,
      ]),
      phoneNumber: new FormControl("", [Validators.required]),
      disable: new FormControl(false),
      role: new FormControl("", [Validators.required]),
    });
  }

  initForm() {
    try {
    this.updateForm.patchValue(this.userProfile);    
    }catch(error) {
      console.log("initForm", error);
    }
  }

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get("id");
    const userRole = this.route.snapshot.paramMap.get("role");
    const role = UserType[userRole as keyof typeof UserType];
    this.loadUserByRole(id, role);
  }

  loadUserByRole(id: string, role: UserType) {
    switch (role.toString()) {
      case UserType[UserType.Manager]:
        this.loadManager(id);
        break;
      case UserType[UserType.Employee]:
        this.loadEmployee(id);
        break;
    }
  }

  loadManager(id: string) {
    firstValueFrom(this.managerService.getByIdToUpdate(id)).then(
      (response) => {
        if (response.isSuccess) {
          this.loadManagerProfile(response.data);
          this.initForm();
        }
      }
    );
  }

  loadEmployee(id: string) {
    firstValueFrom(this.employeeService.getByIdToUpdate(id)).then(
      (response) => {
        if (response.isSuccess) {
          this.loadEmployeeProfile(response.data);
          this.initForm();
        }
      }
    );
  }

  loadManagerProfile(manager: ManagerModel) {
    this.userProfile = new ViewUserModel();
    this.userProfile.id = manager.id;
    this.userProfile.name = manager.user.name;
    this.userProfile.disable = manager.user.disable;
    this.userProfile.email = manager.user.email;
    this.userProfile.phoneNumber = manager.user.phoneNumber;
    this.userProfile.role = manager.user.userRoles[0].role.userType;
    this.userProfile.userId = manager.userId;
    this.userProfile.user = manager.user;
  } 

    loadEmployeeProfile(employee: EmployeeModel) {
    this.userProfile = new ViewUserModel();
    this.userProfile.id = employee.id;
    this.userProfile.name = employee.user.name;
    this.userProfile.disable = employee.user.disable;
    this.userProfile.email = employee.user.email;
    this.userProfile.phoneNumber = employee.user.phoneNumber;
    this.userProfile.role = employee.user.userRoles[0].role.userType;
    this.userProfile.userId = employee.userId;
    this.userProfile.user = employee.user;
  } 

  update() {
    this.userProfile.user.disable = this.updateForm.get("disable").value;
    console.log(this.userProfile.user);
    firstValueFrom(this.userService.update(this.userProfile.user)).then((response) => {
      if (response.isSuccess)
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    });
  }
  catch(error) {
    console.log("update", error);
  }

  cancel() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }
}
