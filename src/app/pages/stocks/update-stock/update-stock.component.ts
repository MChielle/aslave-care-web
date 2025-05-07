import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StockModel } from "app/shared/models/stock/stock.model";
import { StockTypeModel } from "app/shared/models/stockType/stock-type.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { StockTypeService } from "app/shared/services/stockType/stock-type.service";
import { StockNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

declare var $: any;

type UserFields = "id" | "name" | "description" | "disable" | "quantity" | "quantityLowWarning" | "stockTypeId";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-stock",
  templateUrl: "./update-stock.component.html",
  styleUrls: ["./update-stock.component.scss"],
})
export class UpdateStockComponent implements OnInit {
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
  ) {
    this.updateForm = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      quantity: new FormControl(0, [Validators.required]),
      quantityLowWarning: new FormControl(0, [Validators.required]),
      disable: new FormControl(false),
      stockTypeId: new FormControl("", [Validators.required]),
    });
  }

  get id() {
    return this.updateForm.get("id").value;
  }
  get name() {
    return this.updateForm.get("name").value;
  }
  get description() {
    return this.updateForm.get("description").value;
  }
  get quantity() {
    return this.updateForm.get("quantity").value;
  }
  get quantityLowWarning() {
    return this.updateForm.get("quantityLowWarning").value;
  }
  get disable() {
    return this.updateForm.get("disable").value;
  }

  get stockTypeId() {
    return this.updateForm.get("stockTypeId").value;
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

  ngOnInit(): void {
    this.loadStockTypes();
    const stockId = this.route.snapshot.paramMap.get("id");
    firstValueFrom(this.service.getById(stockId)).then((response) => {
      if (response.isSuccess) {
        const stock = response.data as StockModel;
        this.updateForm.patchValue(stock);
      }
    });
  }

  showNomeAvailableNotification() {
    const notification = this.notificationService.buildNotification(
      "Conflito, este nome pertence a outro cadastro.",
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  sendUpdateRequest(stock: StockModel) {
    this.service.update(stock).subscribe((response) => {
      if (response.isSuccess) {
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      }
    });
  }

  update() {
    const model = this.updateForm.value as StockModel;
    const parameters = new StockModel();
    parameters.name = model.name;
    this.service.getByParameters(parameters).subscribe((response) => {
      if (
        response.isSuccess &&
        (!response?.data[0] || response?.data[0]?.id == model.id) &&
        this.updateForm.valid
      ) {
        this.sendUpdateRequest(model);
      } else {
        this.showNomeAvailableNotification();
      }
    });
  }
  catch(error) {
    console.log("update", error);
  }

  cancel() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }

  onChangeStockType(type) {
    this.selectedStockTypeId = type.target.value;
  }
}
