import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { RegisterOutSelectedSupply } from "app/shared/models/register-out-stock/register-out-selected-supplies.model";
import { CreateRegisterOutModel } from "app/shared/models/register-out/create-register-out.model";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { NotificationService } from "app/shared/services/notification/notification.service";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { StockService } from "app/shared/services/stock/stock.service";
import { RegisterOutNames } from "app/shared/utils/names";

declare var $: any;
type UserFields = "description" | "apply" | "registerOutStocks";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-update-register-out-stock",
  templateUrl: "./update-register-out-stock.component.html",
  styleUrls: ["./update-register-out-stock.component.scss"],
})
export class UpdateRegisterOutStockComponent implements OnInit {
  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegisterOutSelectedSupply[] = new Array();
  public registerOut: RegisterOutModel = new RegisterOutModel();
  public updateForm: FormGroup;
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
    this.updateForm = this.fb.group({
      description: new FormControl(""),
      apply: new FormControl(false),
      registerOutStocks: new FormControl(""),
    });
  }

  ngOnInit(): void {
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

  sendUpdateRequest(supplier: RegisterOutModel) {
    try {
      this.service.update(supplier).subscribe((response) => {
        if (response.isSuccess)
          this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
      });
    } catch (error) {
      console.log("sendUpdateRequest", error);
    }
  }

  update() {
    try {
      this.updateForm.controls["registerOutStocks"].setValue(
        this.selectedSupplies
      );
      const model = this.updateForm.value as RegisterOutModel;
      this.sendUpdateRequest(model);
    } catch (error) {
      console.log("update", error);
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
