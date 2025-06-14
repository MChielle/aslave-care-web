import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterOutSelectedSupply } from "app/shared/models/register-out-stock/register-out-selected-supplies.model";
import { CreateRegisterOutModel } from "app/shared/models/register-out/create-register-out.model";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { SupplierService } from "app/shared/services/supplier/supplier.service";
import { RegisterOutNames, RegistersNames } from "app/shared/utils/names";

declare var $: any;
type UserFields = "description" | "apply" | "registerOutStocks";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-create-register-out-stock",
  templateUrl: "./create-register-out-stock.component.html",
  styleUrls: ["./create-register-out-stock.component.scss"],
})
export class CreateRegisterOutStockComponent implements OnInit {
  public propertyLenght;

  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegisterOutSelectedSupply[] = new Array();
  public registerOut: CreateRegisterOutModel = new CreateRegisterOutModel();
  public createForm: FormGroup;
  public formErrors: FormErrors = {
    description: "",
    apply: "",
    registerOutStocks: "",
  };

  constructor(
    private names: RegisterOutNames,
    private fb: FormBuilder,
    private service: RegisterOutService<RegisterOutModel>,
    private stockService: StockService<StockModel>,
    private notificationService: NotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm = this.fb.group({
      description: new FormControl(""),
      apply: new FormControl(false),
      registerOutStocks: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.propertyLenght = PropertyLenghtConstants;
    this.stockService.getToList().subscribe((response) => {
      if (response.isSuccess) this.supplies = response.data;
    });
  }

  showNameAvailableNotification() {
    const notification = this.notificationService.buildNotification(
      "Conflito, este nome pertence a outro cadastro.",
      "primary",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  sendCreateRequest(supplier: CreateRegisterOutModel) {
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
      console.log("create");
      this.createForm.controls["registerOutStocks"].setValue(
        this.selectedSupplies
      );
      const model = this.createForm.value as CreateRegisterOutModel;
      console.log(model);
      this.sendCreateRequest(model);
    } catch (error) {
      console.log("create", error);
    }
  }

  selectSupply(stock: StockModel) {
    try {
      const alreadySelected = this.selectedSupplies.find(
        (x) => x.stockId == stock.id
      );
      if (alreadySelected) return;

      const selectedSupply = new RegisterOutSelectedSupply(
        stock.id,
        stock.name,
        0,
        0
      );

      this.selectedSupplies.push(selectedSupply);
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
      this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    } catch (error) {
      console.log("cancel", error);
    }
  }
}
