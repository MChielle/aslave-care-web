import { Component, OnInit } from "@angular/core";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { SupplierService } from "../../shared/services/supplier/supplier.service";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { FormatHelper } from "../../shared/utils/helpers/format.helper";
import { SupplierNames } from "app/shared/utils/names";

@Component({
  selector: "app-supplier",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  public models: SupplierModel[];

  constructor(
    private names: SupplierNames,
    private service: SupplierService<SupplierModel>,
    private router: Router,
    private formatHelper: FormatHelper
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    firstValueFrom(this.service.getToList())
      .then((response) => {
        if (response.isSuccess) {
          this.models = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createNew() {
    this.router.navigate([`create-${this.names.URL_LOWER_CASE}`]);
  }

  softDelete(id: string) {
    console.log(id);
    firstValueFrom(this.service.softDelete(id))
      .then((response) => {
        console.log(response);
        this.models = this.models.filter((x) => x.id !== id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(id: string) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, id]);
  }

  phoneNumberFormatter(phoneNumber: string) {
    return this.formatHelper.phoneNumberFormatter(phoneNumber);
  }
}
