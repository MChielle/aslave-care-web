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
declare var $: any;

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
  selector: "app-create-supplier",
  templateUrl: "./create-supplier.component.html",
  styleUrls: ["./create-supplier.component.scss"],
})
export class CreateSupplierComponent implements OnInit {
  public createForm: FormGroup;
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

  showNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
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
    this.createForm.markAllAsTouched();
    this.service.getByParameters(parameters).subscribe((response) => {
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

      if (this.createForm.valid) {
        this.sendCreateRequest(model);
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
