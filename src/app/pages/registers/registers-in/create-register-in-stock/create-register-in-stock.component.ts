import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterInSelectedSupply } from "app/shared/models/register-in-stock/register-in-selected-supplies.model";
import { CreateRegisterInModel } from "app/shared/models/register-in/create-register-in.model";
import { RegisterInModel } from "app/shared/models/register-in/register-in.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterInService } from "app/shared/services/register-in/register-in.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { SupplierService } from "app/shared/services/supplier/supplier.service";
import { RegisterInNames, StockNames } from "app/shared/utils/names";

declare var $: any;
type UserFields =
  | "supplier"
  | "supplierId"
  | "donation"
  | "description"
  | "apply"
  | "registerInStocks";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-create-register-in-stock",
  templateUrl: "./create-register-in-stock.component.html",
  styleUrls: ["./create-register-in-stock.component.scss"],
})
export class CreateRegisterInStockComponent implements OnInit {
  public propertyLenght;
  public suppliers: SupplierModel[];
  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegisterInSelectedSupply[] = new Array();
  public registerIn: CreateRegisterInModel = new CreateRegisterInModel();
  public createForm: FormGroup;
  public formErrors: FormErrors = {
    supplier: "",
    supplierId: "",
    donation: "",
    description: "",
    apply: "",
    registerInStocks: "",
  };

  constructor(
    private names: RegisterInNames,
    private fb: FormBuilder,
    private service: RegisterInService<RegisterInModel>,
    private stockService: StockService<StockModel>,
    private supplierService: SupplierService<SupplierModel>,
    private notificationService: NotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm = this.fb.group({
      supplier: new FormControl(""),
      supplierId: new FormControl(""),
      donation: new FormControl(false),
      description: new FormControl(""),
      apply: new FormControl(false),
      registerInStocks: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.propertyLenght = PropertyLenghtConstants;
    this.supplierService.getToList().subscribe((response) => {
      if (response.isSuccess) this.suppliers = response.data;
    });
    this.stockService.getToList().subscribe((response) => {
      if (response.isSuccess) this.supplies = response.data;
    });
  }

  showNameAvailableNotification() {
    const notification = this.notificationService.buildNotification(
      "Conflito, este nome pertence a outro cadastro.",
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  sendCreateRequest(supplier: CreateRegisterInModel) {
    try {
      this.service.create(supplier).subscribe((response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      });
    } catch (error) {
      console.log("sendCreateRequest", error);
    }
  }

  create() {
    try {
      this.createForm.controls["registerInStocks"].setValue(
        this.selectedSupplies
      );
      const model = this.createForm.value as CreateRegisterInModel;
      console.log(model);
      this.sendCreateRequest(model);
    } catch (error) {
      console.log("create", error);
    }
  }

  selectSupplier(supplier) {
    try {
      this.createForm.controls["supplierId"].setValue(supplier?.id);
      this.createForm.controls["supplier"].setValue(supplier);
      this.cdr.detectChanges();
    } catch (error) {
      console.log("selectSupplier", error);
    }
  }

  selectSupply(stock) {
    try {
      const alreadySelected = this.selectedSupplies.find(
        (x) => x.stockId == stock.id
      );
      if (alreadySelected) return;

      const selectedSupplie = new RegisterInSelectedSupply(
        stock.id,
        stock.name,
        0,
        0
      );

      this.selectedSupplies.push(selectedSupplie);
      this.supply = "";
    } catch (error) {
      console.log("selectSupply", error);
    }
  }

  deleteSupply(id: string) {
    try {
      this.selectedSupplies = this.selectedSupplies.filter(
        (x) => x.stockId != id
      );
    } catch (error) {
      console.log("deleteSupply", error);
    }
  }

  cancel() {
    try {
      this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    } catch (error) {
      console.log("cancel", error);
    }
  }
}
