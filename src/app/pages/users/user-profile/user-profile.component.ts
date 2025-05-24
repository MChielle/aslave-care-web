import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserProfileModel } from "app/shared/models/user/user-profile.model";
import { UserModel } from "app/shared/models/user/user.model";
import { LocalStorageService } from "app/shared/services/app/local-storage.service";
import { UserService } from "app/shared/services/user/user.service";
import { ValidatorHelper } from "app/shared/utils/helpers/validator.helper";

type UserFields = "id" | "name" | "email" | "phoneNumber" | "disable";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public userProfile: UserProfileModel;
  public updateForm: FormGroup;
  public formErrors: FormErrors = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    disable: "",
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService<UserModel>
  ) {}

  ngOnInit() {
    this.initForm();
    this.userService.getByToken().subscribe((response) => {
      if (response.isSuccess) {
        this.userProfile = response.data;
        this.loadForm();
      }
    });
  }

  initForm() {
    this.updateForm = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        ValidatorHelper.isValidEmail,
      ]),
      phoneNumber: new FormControl("", [Validators.required]),
      disable: new FormControl(false),
    });
  }

  loadForm() {
    this.updateForm.get("id").setValue(this.userProfile.id);
    this.updateForm.get("name").setValue(this.userProfile.name);
    this.updateForm.get("email").setValue(this.userProfile.user.email);
    this.updateForm.get("phoneNumber").setValue(this.userProfile.user.phoneNumber);
    this.updateForm.get("disable").setValue(this.userProfile.disable);
  }

  cancel() {}
}
