import { Component, OnInit } from "@angular/core";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { SupplierService } from "../../shared/services/supplier/supplier.service";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { FormatHelper } from "../../shared/utils/helpers/format.helper"
import { SupplierNames } from "app/shared/utils/names";

@Component({
  selector: "app-supplier",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  public suppliers: SupplierModel[];

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private formatHelper: FormatHelper
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    firstValueFrom(this.supplierService.getToList())
      .then((response) => {
        if (response.isSuccess) {
          this.suppliers = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createNew() {
    this.router.navigate([`create-${SupplierNames.NAME}`]);
  }

  softDelete(id: string) {
    console.log(id);
    firstValueFrom(this.supplierService.softDelete(id))
      .then((response) => {
        console.log(response);
        this.suppliers = this.suppliers.filter(x => x.id !== id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(id: string) {
  this.router.navigate([`update-${SupplierNames.NAME}`, id ]);
  }

  phoneNumberFormatter(phoneNumber: string){
    return this.formatHelper.phoneNumberFormatter(phoneNumber);
  }
}
