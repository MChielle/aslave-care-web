import { Component, OnInit } from "@angular/core";
import { SupplierService } from "app/shared/services/supplier/supplier.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { SupplierNames } from "app/shared/utils/names";
import { ValidatorHelper } from "app/shared/utils/helpers/validator.helper";
import { param } from "jquery";
declare var $: any;

type UserFields = "name" | "email" | "phoneNumber";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-create-supplier",
  templateUrl: "./create-supplier.component.html",
  styleUrls: ["./create-supplier.component.scss"],
})
export class CreateSupplierComponent implements OnInit {
  public createForm: FormGroup;
  public formErrors: FormErrors = {
    name: "",
    email: "",
    phoneNumber: "",
  };

  constructor(
    private names: SupplierNames,
    private fb: FormBuilder,
    private service: SupplierService<SupplierModel>,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        ValidatorHelper.isValidEmail,
      ]),
      phoneNumber: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get name() {
    return this.createForm.get("name").value;
  }
  get email() {
    return this.createForm.get("email").value;
  }
  get phoneNumber() {
    return this.createForm.get("phoneNumber").value;
  }

  showEmailAvailableNotification() {
    const notification = this.notificationService.buildNotification(
      "Conflito, este email pertence a outro cadastro.",
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  sendCreateRequest(supplier: SupplierModel) {
    this.service.create(supplier).subscribe((response) => {
      if (response.isSuccess)
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    });
  }

  create() {
    const model = this.createForm.value as SupplierModel;
    const parameters = new SupplierModel();
    parameters.email = model.email;
    this.service.getByParameters(parameters).subscribe((response) => {
      if (response.isSuccess && !response?.data[0] && this.createForm.valid)
        this.sendCreateRequest(model);
      else this.showEmailAvailableNotification();
    });
  }
  catch(error) {
    console.log("create", error);
  }

  cancel(){
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }
}
