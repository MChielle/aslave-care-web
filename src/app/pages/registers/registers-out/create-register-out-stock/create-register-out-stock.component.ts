import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterOutSelectedSupply } from "app/shared/models/register-out-stock/register-out-selected-supplies.model";
import { CreateRegisterOutModel } from "app/shared/models/register-out/create-register-out.model";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { RegisterOutNames } from "app/shared/utils/names";

declare var $: any;
type UserFields = "description" | "apply" | "registerOutStocks" | "applyDate";
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
    applyDate: "",
  };

  constructor(
    private names: RegisterOutNames,
    private fb: FormBuilder,
    private service: RegisterOutService<RegisterOutModel>,
    private stockService: StockService<StockModel>,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm = this.fb.group({
      description: new FormControl(""),
      apply: new FormControl(false),
      registerOutStocks: new FormControl("", [Validators.required]),
      applyDate: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    this.propertyLenght = PropertyLenghtConstants;
    this.stockService.getToList().subscribe((response) => {
      if (response.isSuccess) this.supplies = response.data;
    });
  }

  sendCreateRequest(supplier: CreateRegisterOutModel) {
    try {
      this.service.create(supplier).subscribe((response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  buildRequestModel(): CreateRegisterOutModel {
    try {
      const model = this.createForm.value as CreateRegisterOutModel;
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

  create() {
    try {
      this.createForm.controls["registerOutStocks"].setValue(
        this.selectedSupplies
      );
      this.createForm.markAllAsTouched();
      const model = this.buildRequestModel();
      if (this.createForm.valid) this.sendCreateRequest(model);
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

      const selectedSupply = new RegisterOutSelectedSupply(
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
