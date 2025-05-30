import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PropertyLenghtConstants } from "app/shared/constants/property-lenght.constants";
import { RegisterOutSelectedSupply } from "app/shared/models/register-out-stock/register-out-selected-supplies.model";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { RegisterOutNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

declare var $: any;
type UserFields = "id" | "description" | "apply" | "registerOutStocks";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-register-out-stock",
  templateUrl: "./update-register-out-stock.component.html",
  styleUrls: ["./update-register-out-stock.component.scss"],
})
export class UpdateRegisterOutStockComponent implements OnInit {
  public propertyLenght;
  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegisterOutSelectedSupply[] = new Array();
  public registerOut: RegisterOutModel = new RegisterOutModel();
  public updateForm: FormGroup;
  public formErrors: FormErrors = {
    id: "",
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
    private route: ActivatedRoute
  ) {}

  initForm() {
    try {
      this.updateForm = this.fb.group({
        id: new FormControl(""),
        description: new FormControl(""),
        apply: new FormControl(false),
        registerOutStocks: new FormControl(""),
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.propertyLenght = PropertyLenghtConstants;
    this.initForm();
    this.stockService.getToList().subscribe((response) => {
      if (response.isSuccess) this.supplies = response.data;
    });

    const registerOutId = this.route.snapshot.paramMap.get("id");
    firstValueFrom(this.service.getByIdToUpdate(registerOutId)).then(
      (response) => {
        console.log({ response });
        if (response.isSuccess) {
          this.registerOut = response.data as RegisterOutModel;
          this.registerOut.id = registerOutId;

          console.log(this.registerOut);

          this.selectedSupplies =
            this.registerOut.registerOutStocks.map<RegisterOutSelectedSupply>(
              (x) => {
                return new RegisterOutSelectedSupply(
                  x.stockId,
                  x.stock.name,
                  x.price,
                  x.quantity
                );
              }
            );
          this.updateForm.patchValue(this.registerOut);
        }
      }
    );
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

  sendUpdateRequest(supplier: RegisterOutModel) {
    try {
      this.service.update(supplier).subscribe((response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  update() {
    try {
      this.updateForm.controls["registerOutStocks"].setValue(
        this.selectedSupplies
      );
      const registerOutModel = this.updateForm.value as RegisterOutModel;
      console.log("this.updateForm.valid", this.updateForm.valid);
      if (this.updateForm.valid) this.sendUpdateRequest(registerOutModel);
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
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }
}
