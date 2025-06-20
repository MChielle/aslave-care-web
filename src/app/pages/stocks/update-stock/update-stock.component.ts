import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { StockModel } from "app/shared/models/stock/stock.model";
import { StockTypeModel } from "app/shared/models/stockType/stock-type.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { StockTypeService } from "app/shared/services/stockType/stock-type.service";
import { StockNames } from "app/shared/utils/names";
import { DecimalValidator } from "app/shared/validators/quantity.validator";
import { firstValueFrom } from "rxjs";

declare var $: any;

type UserFields =
  | "id"
  | "name"
  | "description"
  | "disable"
  | "quantity"
  | "quantityLowWarning"
  | "stockTypeId";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-stock",
  templateUrl: "./update-stock.component.html",
  styleUrls: ["./update-stock.component.scss"],
})
export class UpdateStockComponent implements OnInit {
  public propertyLenght;
  public updateForm: FormGroup;
  public stockTypes: StockTypeModel[] = [];
  public selectedStockTypeId: string;
  public formErrors: FormErrors = {
    id: "",
    name: "",
    description: "",
    quantity: "",
    quantityLowWarning: "",
    disable: "",
    stockTypeId: "",
  };

  constructor(
    private names: StockNames,
    private router: Router,
    private route: ActivatedRoute,
    private service: StockService<StockModel>,
    private stockTypeService: StockTypeService<StockTypeModel>,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  initForm() {
    this.updateForm = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      quantity: new FormControl(0, [
        Validators.required,
        DecimalValidator.decimal(2),
      ]),
      quantityLowWarning: new FormControl(0, [
        Validators.required,
        DecimalValidator.decimal(2),
      ]),
      disable: new FormControl(false),
      stockTypeId: new FormControl("", [Validators.required]),
    });
  }

  loadStockTypes() {
    try {
      this.stockTypeService.getToList().subscribe((response) => {
        if (response.isSuccess) {
          setTimeout(() => {
            this.stockTypes = response.data;
          }, 200);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    try {
      this.propertyLenght = PropertyLenghtConstants;
      this.initForm();
      this.loadStockTypes();
      const stockId = this.route.snapshot.paramMap.get("id");
      if (stockId)
        firstValueFrom(this.service.getById(stockId)).then((response) => {
          if (response.isSuccess) {
            const stock = response.data as StockModel;
            this.updateForm.patchValue(stock);
          }
        });
    } catch (error) {
      console.log(error);
    }
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

  sendUpdateRequest(stock: StockModel) {
    try {
      this.service.update(stock).subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  update() {
    try {
      const model = this.updateForm.value as StockModel;
      const parameters = new StockModel();
      parameters.name = model.name;
      this.updateForm.markAllAsTouched();
      this.service.getByParameters(parameters).subscribe((response) => {
        if (
          response.isSuccess &&
          response.data[0] &&
          response.data[0].name == model.name &&
          response.data[0].id != model.id
        ) {
          this.showNotification(
            "Conflito, este nome pertence a outro cadastro."
          );
          return;
        }

        if (this.updateForm.controls.errors) {
          this.showNotification(this.updateForm.controls.errors?.getError.name);
          return;
        }

        if (response.isSuccess && this.updateForm.valid)
          this.sendUpdateRequest(model);
      });
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }

  onChangeStockType(type) {
    this.selectedStockTypeId = type.target.value;
  }
}
