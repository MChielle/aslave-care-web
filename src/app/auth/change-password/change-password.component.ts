import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SignInChangePasswordModel } from "app/shared/models/signin/signin-change-password.model";
import { LocalStorageService } from "app/shared/services/app/local-storage.service";
import { AuthService } from "app/shared/services/auth/auth.service";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { ToastrService } from "ngx-toastr";

declare var $: any;

type UserFields = "oldPassword" | "newPassword" | "repeatNewPassword";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public model: SignInChangePasswordModel;
  public formErrors: FormErrors = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  public errorMessage: any;
  public seePassword = false;

  constructor(
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", Validators.required),
      repeatNewPassword: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {}

  showNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  navigateToDashboard() {
    this.router.navigate(["dashboard"]);
  }

  changePassword() {
    if (
      this.changePasswordForm.controls.oldPassword.value != null &&
      this.changePasswordForm.controls.newPassword.value ==
        this.changePasswordForm.controls.repeatNewPassword.value
    ) {
      this.model = new SignInChangePasswordModel(
        this.changePasswordForm.controls.oldPassword.value,
        this.changePasswordForm.controls.newPassword.value
      );
      this.authService
        .confirmChangePassword(this.model)
        .subscribe((response) => {
          this.authService.logout();
        });
    }
  }
}
