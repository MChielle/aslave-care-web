import { FormatHelper } from "app/shared/utils/helpers/format.helper";
import { BaseModel } from "../base/base.model";
import { RegisterInStockModel } from "../register-in-stock/register-in-stock.model";
import { SupplierModel } from "../supplier/supplier.model";
import { RegisterInModel } from "./register-in.model";

export class ViewRegisterInModel extends BaseModel<string> {
  supplierId: string;
  number: number;
  supplierName: string;
  supplier: SupplierModel;
  donation: boolean;
  applyDate: Date;
  formattedApplyDate: string;
  description: string;
  apply: boolean;
  registerInStocks: RegisterInStockModel[];

  constructor(private formatHelper: FormatHelper, registerIn: RegisterInModel) {
    super();
    this.id = registerIn.id;
    this.supplierId = registerIn.supplierId;
    this.number = registerIn.number;
    this.supplierName = registerIn.supplier.name;
    this.supplier = registerIn.supplier;
    this.donation = registerIn.donation;
    this.applyDate = registerIn.applyDate;
    this.formattedApplyDate = this.formatHelper.dateFormatter(
      registerIn.applyDate
    );
    this.description = registerIn.description;
    this.apply = registerIn.apply;
    this.registerInStocks = registerIn.registerInStocks;
  }
}
