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
import { AuthService } from "app/shared/services/auth/auth.service";
import { EmployeeService } from "app/shared/services/employee/employee.service";
import { ManagerService } from "app/shared/services/manager/manager.service";
import { UserService } from "app/shared/services/user/user.service";
import { ValidatorHelper } from "app/shared/utils/helpers/validator.helper";
import { UserNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

type UserFields =
  | "id"
  | "userId"
  | "name"
  | "email"
  | "phoneNumber"
  | "disable"
  | "role"
  | "password"
  | "repeatPassword";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.scss"],
})
export class UpdateUserComponent implements OnInit {
  public userMaster: boolean;
  public userProfile: ViewUserModel = new ViewUserModel();
  public updateForm: FormGroup;
  public formErrors: FormErrors = {
    id: "",
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    disable: "",
    role: "",
    password: "",
    repeatPassword: "",
  };

  constructor(
    private names: UserNames,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService<UserModel>,
    private employeeService: EmployeeService<EmployeeModel>,
    private managerService: ManagerService<ManagerModel>,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  get id() {
    return this.updateForm.controls.id.value;
  }
  get userId() {
    return this.updateForm.controls.userId.value;
  }
  get name() {
    return this.updateForm.controls.name.value;
  }
  get email() {
    return this.updateForm.controls.email.value;
  }
  get phoneNumber() {
    return this.updateForm.controls.phoneNumber.value;
  }
  get disable() {
    return this.updateForm.controls.disable.value;
  }
  get role() {
    return this.updateForm.controls.role.value;
  }
  get password() {
    return this.updateForm.controls.password.value;
  }
  get repeatPassword() {
    return this.updateForm.controls.repeatPassword.value;
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
      password: new FormControl("", [Validators.required]),
      repeatPassword: new FormControl("", [Validators.required]),
    });
  }

  initForm() {
    try {
      this.updateForm.patchValue(this.userProfile);
      this.updateForm.controls.name.disable();
      this.updateForm.controls.email.disable();
      this.updateForm.controls.phoneNumber.disable();
      this.updateForm.controls.role.disable();
    } catch (error) {
      console.log("initForm", error);
    }
  }

  ngOnInit(): void {
    this.userMaster = this.authService.isMaster();
    this.buildForm();
    const id = this.route.snapshot.paramMap.get("id");
    const role = this.route.snapshot.paramMap.get("role");
    this.loadUserByRole(id, role);
  }

  loadUserByRole(id: string, role: string) {
    switch (role) {
      case UserType[UserType.Manager]:
        this.loadManager(id);
        break;
      case UserType[UserType.Employee]:
        this.loadEmployee(id);
        break;
    }
  }

  loadManager(id: string) {
    firstValueFrom(this.managerService.getByIdToUpdate(id)).then((response) => {
      if (response.isSuccess) {
        this.userProfile.fromManagerUserModel(response.data);
        this.initForm();
      }
    });
  }

  loadEmployee(id: string) {
    firstValueFrom(this.employeeService.getByIdToUpdate(id)).then(
      (response) => {
        if (response.isSuccess) {
          this.userProfile.fromEmployeeUserModel(response.data);
          this.initForm();
        }
      }
    );
  }

  update() {
    this.userProfile.user.disable = this.updateForm.controls.disable.value;

    if (this.userMaster) {
      this.userProfile.user.password =
        this.updateForm.controls.password.value;
      this.updateAsMaster();
      return;
    }

    this.updateAsManager();
  }
  catch(error) {
    console.log("update", error);
  }

  updateAsMaster() {
    firstValueFrom(this.userService.updateByMaster(this.userProfile.user)).then(
      (response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      }
    );
  }

  updateAsManager() {
    firstValueFrom(this.userService.update(this.userProfile.user)).then(
      (response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      }
    );
  }

  cancel() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }
}
