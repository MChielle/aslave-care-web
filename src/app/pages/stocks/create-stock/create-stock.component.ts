import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockModel } from 'app/shared/models/stock/stock.model';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { StockService } from 'app/shared/services/stock/stock.service';
import { StockNames } from 'app/shared/utils/names';

declare var $: any;

type UserFields = "name" | "quantity" ;
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {
  public createForm: FormGroup;
  public formErrors: FormErrors = {
    name: "",
    quantity: ""
  };

  constructor(
    private names: StockNames,
    private fb: FormBuilder,
    private service: StockService<StockModel>,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      quantity: new FormControl("",[Validators.required]),
    });
  }

  ngOnInit(): void {}

  get name() {
    return this.createForm.get("name").value;
  }

  get quantity() {
    return this.createForm.get("quantity").value;
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
      if (response.isSuccess && !response?.data[0] && this.createForm.valid)
        this.sendCreateRequest(model);
      else this.showNameAvailableNotification();
    });
  }
  catch(error) {
    console.log("create", error);
  }
}
