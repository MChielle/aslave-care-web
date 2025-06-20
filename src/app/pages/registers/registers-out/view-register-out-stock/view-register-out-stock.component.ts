import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterOutSelectedSupply } from 'app/shared/models/register-out-stock/register-out-selected-supplies.model';
import { RegisterOutModel } from 'app/shared/models/register-out/register-out.model';
import { RegisterOutService } from 'app/shared/services/register-out/register-out.service';
import { RegisterOutNames } from 'app/shared/utils/names';
import { firstValueFrom } from 'rxjs';
declare var $: any;
type UserFields = "donation" | "description" | "apply";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-view-register-out-stock',
  templateUrl: './view-register-out-stock.component.html',
  styleUrls: ['./view-register-out-stock.component.scss']
})
export class ViewRegisterOutStockComponent implements OnInit {
public propertyLenght;
  public supply: string;
  public selectedSupplies: RegisterOutSelectedSupply[] = new Array();
  public registerOut: RegisterOutModel = new RegisterOutModel();
  public viewForm: FormGroup;
  public formErrors: FormErrors = {
    donation: "",
    description: "",
    apply: "",
  };

  constructor(
    private names: RegisterOutNames,
    private fb: FormBuilder,
    private service: RegisterOutService<RegisterOutModel>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  buildForm() {
    this.viewForm = this.fb.group({
      donation: new FormControl(false),
      description: new FormControl(""),
      apply: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.buildForm();
    const registerOutId = this.route.snapshot.paramMap.get("id");
    firstValueFrom(this.service.getByIdToUpdate(registerOutId)).then(
      (response) => {
        if (response.isSuccess) {
          this.registerOut = response.data as RegisterOutModel;
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
          this.initForm();
        }
      }
    );
  }

  initForm() {
    this.viewForm.controls.description.setValue(this.registerOut.description);
    this.viewForm.controls.apply.setValue(this.registerOut.apply);
    this.viewForm.controls.description.disable();
    this.viewForm.controls.apply.disable();
  }

  cancel() {
    try {
      this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    } catch (error) {
      console.log(error);
    }
  }
}
