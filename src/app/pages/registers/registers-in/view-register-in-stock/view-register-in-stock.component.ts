import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
type UserFields = "supplierName" | "donation" | "description" | "apply";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-view-register-in-stock",
  templateUrl: "./view-register-in-stock.component.html",
  styleUrls: ["./view-register-in-stock.component.scss"],
})
export class ViewRegisterInStockComponent implements OnInit {
  public propertyLenght;
  public supply: string;
  public selectedSupplies: RegisterInSelectedSupply[] = new Array();
  public registerIn: RegisterInModel = new RegisterInModel();
  public viewForm: FormGroup;
  public formErrors: FormErrors = {
    supplierName: "",
    donation: "",
    description: "",
    apply: "",
  };

  constructor(
    private names: RegisterInNames,
    private fb: FormBuilder,
    private service: RegisterInService<RegisterInModel>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  buildForm() {
    this.viewForm = this.fb.group({
      supplierName: new FormControl(""),
      donation: new FormControl(false),
      description: new FormControl(""),
      apply: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.buildForm();
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

  initForm() {
    this.viewForm.controls.donation.setValue(this.registerIn.donation);
    this.viewForm.controls.description.setValue(this.registerIn.description);
    this.viewForm.controls.apply.setValue(this.registerIn.apply);
    this.viewForm.controls.supplierName.setValue(this.registerIn.supplier.name);
    this.viewForm.controls.donation.disable();
    this.viewForm.controls.description.disable();
    this.viewForm.controls.apply.disable();
    this.viewForm.controls.supplierName.disable();
  }

  cancel() {
    try {
      this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    } catch (error) {
      console.log(error);
    }
  }
}
