import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "app/shared/services/app/local-storage.service";
import { AuthService } from "app/shared/services/auth/auth.service";
import { ToastrService } from "ngx-toastr";
import { Constants } from "app/shared/constants/aslavecare.constants";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { NotificationService } from "app/shared/services/notification/notification.service";
declare var $: any;

type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  public propertyLenght;
  public signInForm: FormGroup;
  public formErrors: FormErrors = {
    email: "",
    password: "",
  };

  public errorMessage: any;
  public seePassword = false;

  constructor(
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit() {
    this.propertyLenght = PropertyLenghtConstants;
    let lastEmail = this.localStorageService.getItem(
      Constants.LAST_LOGIN_EMAIL
    );
    this.localStorageService.clearLocalStorage();
    if (lastEmail) {
      this.localStorageService.setItem(Constants.LAST_LOGIN_EMAIL, lastEmail);
      this.signInForm.patchValue({ email: lastEmail });
    }
  }

  showNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
      "primary",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  signIn() {
    this.authService.showLoader = true;
    this.authService
      .signIn(this.signInForm.value["email"], this.signInForm.value["password"])
      .subscribe({
        next: async (res) => {
          this.localStorageService.setItem(
            Constants.LAST_LOGIN_EMAIL,
            this.signInForm.value["email"]
          );
          this.router.navigate(["dashboard"]);
          this.authService.showLoader = false;
          return;
        },
        error: (err) => {
          this.showNotification("E-mail ou Senha incorretos.");
          this.signInForm.markAllAsTouched();
          this.authService.showLoader = false;
        },
      });
  }

  public changeSeePassword() {
    this.seePassword = !this.seePassword;
  }

  public navigateForgetPasswords() {
    this.router.navigate(["signin", "forgot-password"]);
  }
}
