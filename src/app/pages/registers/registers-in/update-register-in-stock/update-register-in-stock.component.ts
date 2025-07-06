import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterInSelectedSupply } from "app/shared/models/register-in-stock/register-in-selected-supplies.model";
import { RegisterInModel } from "app/shared/models/register-in/register-in.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterInService } from "app/shared/services/register-in/register-in.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { SupplierService } from "app/shared/services/supplier/supplier.service";
import { RegisterInNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

declare var $: any;
type UserFields =
  | "supplierId"
  | "donation"
  | "description"
  | "apply"
  | "registerInStocks"
  | "applyDate";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-register-in-stock",
  templateUrl: "./update-register-in-stock.component.html",
  styleUrls: ["./update-register-in-stock.component.scss"],
})
export class UpdateRegisterInStockComponent implements OnInit {
  public propertyLenght;
  public suppliers: SupplierModel[];
  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegisterInSelectedSupply[] = new Array();
  public registerIn: RegisterInModel = new RegisterInModel();
  public updateForm: FormGroup;
  public formErrors: FormErrors = {
    supplierId: "",
    donation: "",
    description: "",
    apply: "",
    registerInStocks: "",
    applyDate: "",
  };

  constructor(
    private names: RegisterInNames,
    private fb: FormBuilder,
    private service: RegisterInService<RegisterInModel>,
    private stockService: StockService<StockModel>,
    private supplierService: SupplierService<SupplierModel>,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.updateForm = this.fb.group({
      id: new FormControl(""),
      supplierId: new FormControl(""),
      donation: new FormControl(false),
      description: new FormControl(""),
      apply: new FormControl(false),
      registerInStocks: new FormControl("", [Validators.required]),
      applyDate: new FormControl(new Date()),
    });
  }

  initForm() {
    this.updateForm.controls.id.setValue(this.registerIn.id);
    this.updateForm.controls.donation.setValue(this.registerIn.donation);
    this.updateForm.controls.description.setValue(this.registerIn.description);
    this.updateForm.controls.apply.setValue(this.registerIn.apply);
    this.updateForm.controls.supplierId.setValue(this.registerIn.supplierId);
    this.updateForm.controls.registerInStocks.setValue(
      this.registerIn.registerInStocks
    );
  }

  ngOnInit(): void {
    this.propertyLenght = PropertyLenghtConstants;
    this.supplierService.getToList().subscribe((response) => {
      if (response.isSuccess) this.suppliers = response.data;
    });
    this.stockService.getToList().subscribe((response) => {
      if (response.isSuccess) this.supplies = response.data;
    });

    const registerInId = this.route.snapshot.paramMap.get("id");
    firstValueFrom(this.service.getByIdToUpdate(registerInId)).then(
      (response) => {
        if (response.isSuccess) {
          this.registerIn = response.data as RegisterInModel;
          this.selectedSupplies =
            this.registerIn.registerInStocks.map<RegisterInSelectedSupply>(
              (x) => {
                return new RegisterInSelectedSupply(
                  x.stockId,
                  x.stock.name,
                  x.price,
                  x.quantity
                );
              }
            );
          this.initForm();
        }
      }
    );
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

  sendUpdateRequest(supplier: RegisterInModel) {
    try {
      this.service.update(supplier).subscribe((response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  buildRequestModel(): RegisterInModel {
    try {
      const model = this.updateForm.value as RegisterInModel;
      model.applyDate.setHours(new Date().getHours());
      model.applyDate.setMinutes(new Date().getMinutes());
      model.applyDate.setSeconds(new Date().getSeconds());
      if (!model.apply) {
        model.applyDate = null;
        this.cdr.detectChanges();
      }
      return model;
    } catch (error) {
      console.log(error);
    }
  }

  update() {
    try {
      this.updateForm.controls.registerInStocks.setValue(this.selectedSupplies);
      this.updateForm.markAllAsTouched();
      const model = this.buildRequestModel();
      if(this.updateForm.valid) this.sendUpdateRequest(model);
    } catch (error) {
      console.log(error);
    }
  }

  selectSupplier(supplier: SupplierModel) {
    try {
      this.updateForm.controls.supplierId.setValue(supplier.id);
      this.cdr.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }

  selectSupply(stock: StockModel) {
    try {
      const alreadySelected = this.selectedSupplies.find(
        (x) => x.stockId == stock.id
      );
      if (alreadySelected) return;

      const selectedSupply = new RegisterInSelectedSupply(
        stock.id,
        stock.name,
        0,
        0
      );

      this.selectedSupplies.unshift(selectedSupply);
    } catch (error) {
      console.log(error);
    }
  }

  deleteSupply(id: string) {
    try {
      this.selectedSupplies = this.selectedSupplies.filter(
        (x) => x.stockId != id
      );
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    try {
      this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    } catch (error) {
      console.log(error);
    }
  }
}
