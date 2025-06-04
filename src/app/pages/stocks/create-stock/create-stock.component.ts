import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { StockModel } from "app/shared/models/stock/stock.model";
import { StockTypeModel } from "app/shared/models/stockType/stock-type.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { StockTypeService } from "app/shared/services/stockType/stock-type.service";
import { StockNames } from "app/shared/utils/names";
import { DecimalValidator } from "app/shared/validators/quantity.validator";

declare var $: any;

type UserFields =
  | "name"
  | "quantity"
  | "description"
  | "quantityLowWarning"
  | "stockTypeId";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-create-stock",
  templateUrl: "./create-stock.component.html",
  styleUrls: ["./create-stock.component.scss"],
})
export class CreateStockComponent implements OnInit {
  public propertyLenght;
  public createForm: FormGroup;
  public stockTypes: StockTypeModel[] = [];
  public selectedStockTypeId: string;
  public formErrors: FormErrors = {
    name: "",
    quantity: "",
    stockTypeId: "",
    quantityLowWarning: "",
    description: "",
  };

  constructor(
    private names: StockNames,
    private fb: FormBuilder,
    private service: StockService<StockModel>,
    private stockTypeService: StockTypeService<StockTypeModel>,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStockTypes();
    this.propertyLenght = PropertyLenghtConstants;
  }

  initForm() {
    this.createForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [
        Validators.required,
        DecimalValidator.decimal(2),
      ]),
      description: new FormControl(""),
      quantityLowWarning: new FormControl("", [
        Validators.required,
        DecimalValidator.decimal(2),
      ]),
      stockTypeId: new FormControl("", [Validators.required]),
    });
  }

  get name() {
    return this.createForm.get("name").value;
  }

  get quantity() {
    return this.createForm.get("quantity").value;
  }

  get quantityLowWarning() {
    return this.createForm.get("quantityLowWarning").value;
  }

  get stockTypeId() {
    return this.createForm.get("stockTypeId").value;
  }

  loadStockTypes() {
    this.stockTypeService.getToList().subscribe((response) => {
      if (response.isSuccess) {
        setTimeout(() => {
          this.stockTypes = response.data;
        }, 200);
      }
    });
  }

  showNameAvailableNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  sendCreateRequest(supplier: StockModel) {
    this.service.create(supplier).subscribe((response) => {
      if (response.isSuccess)
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    });
  }

  create() {
    const model = this.createForm.value as StockModel;
    const parameters = new StockModel();
    parameters.name = model.name;
    this.service.getByParameters(parameters).subscribe((response) => {
      if (
        response.isSuccess &&
        response.data[0] &&
        response.data[0].name == model.name
      ) {
        this.showNameAvailableNotification(
          "Conflito, este nome pertence a outro cadastro."
        );
        return;
      }

      if (this.createForm.errors || !this.createForm.touched) {
        this.showNameAvailableNotification(this.createForm.errors[0]);
        return;
      }

      if (response.isSuccess && this.createForm.valid && this.createForm.touched)
        this.sendCreateRequest(model);
    });
  }
  catch(error) {
    console.log("create", error);
  }

  cancel() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }

  onChangeStockType(type) {
    this.selectedStockTypeId = type.target.value;
  }
}
