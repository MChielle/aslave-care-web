import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { validateAdditionalItems } from "ajv/dist/vocabularies/applicator/additionalItems";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { SupplierService } from "app/shared/services/supplier/supplier.service";
import { SupplierNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";
declare var $: any;

type UserFields = "id" | "name" | "email" | "phoneNumber" | "disable";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-supplier",
  templateUrl: "./update-supplier.component.html",
  styleUrls: ["./update-supplier.component.scss"],
})
export class UpdateSupplierComponent implements OnInit {
  public updateForm: FormGroup;
  public formErrors: FormErrors = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    disable: "",
  };

  constructor(
    private names: SupplierNames,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService<SupplierModel>,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      disable: new FormControl(false),
    });
  }

  get id() {
    return this.updateForm.get("id").value;
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

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get("id");
    firstValueFrom(this.supplierService.getById(supplierId)).then(
      (response) => {
        if (response.isSuccess) {
          const supplier = response.data as SupplierModel;
          this.updateForm.patchValue(supplier);
        }
      }
    );
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

  sendUpdateRequest(supplier: SupplierModel) {
    this.supplierService.update(supplier).subscribe((response) => {
      if (response.isSuccess) {
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      }
    });
  }

  update() {
    const model = this.updateForm.value as SupplierModel;
    const parameters = new SupplierModel();
    parameters.email = model.email;
    this.supplierService.getByParameters(parameters).subscribe((response) => {
      if (
        response.isSuccess &&
        (!response?.data[0] || response?.data[0]?.id == model.id) &&
        this.updateForm.valid
      ) {
        this.sendUpdateRequest(model);
      } else {
        this.showEmailAvailableNotification();
      }
    });
  }
  catch(error) {
    console.log("update", error);
  }
}
