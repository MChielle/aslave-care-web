import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterOutSelectedSupply } from 'app/shared/models/register-out-stock/register-out-selected-supplies.model';
import { CreateRegisterOutModel } from 'app/shared/models/register-out/create-register-in.model';
import { RegisterOutModel } from 'app/shared/models/register-out/register-out.model';
import { StockModel } from 'app/shared/models/stock/stock.model';
import { SupplierModel } from 'app/shared/models/supplier/supplier.model';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { RegisterOutService } from 'app/shared/services/register-out/register-out.service';
import { StockService } from 'app/shared/services/stock/stock.service';
import { SupplierService } from 'app/shared/services/supplier/supplier.service';
import { RegistersNames, StockNames } from 'app/shared/utils/names';

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
  selector: 'app-create-register-out-stock',
  templateUrl: './create-register-out-stock.component.html',
  styleUrls: ['./create-register-out-stock.component.scss']
})
export class CreateRegisterOutStockComponent implements OnInit {
public suppliers: SupplierModel[];
  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegisterOutSelectedSupply[] = new Array();
  public registerIn: CreateRegisterOutModel = new CreateRegisterOutModel();
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
    private registersNames: RegistersNames,
    private stockNames: StockNames,
    private fb: FormBuilder,
    private service: RegisterOutService<RegisterOutModel>,
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

  sendCreateRequest(supplier: CreateRegisterOutModel) {
    try {
      this.service.create(supplier).subscribe((response) => {
        if (response.isSuccess)
          this.router.navigate([this.registersNames.URL_LOWER_CASE_PLURAL]);
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
      const model = this.createForm.value as CreateRegisterOutModel;
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

      const selectedSupplie = new RegisterOutSelectedSupply();
      selectedSupplie.stockId = stock.id;
      selectedSupplie.name = stock.name;
      selectedSupplie.price = 0;
      selectedSupplie.quantity = 0;

      this.selectedSupplies.push(selectedSupplie);
      console.log(this.selectedSupplies);
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
      this.router.navigate([this.registersNames.URL_LOWER_CASE_PLURAL]);
    } catch (error) {
      console.log("cancel", error);
    }
  }
}
