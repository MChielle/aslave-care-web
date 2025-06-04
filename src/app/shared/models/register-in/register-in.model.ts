import { BaseModel } from "../base/base.model";
import { RegisterInStockModel } from "../register-in-stock/register-in-stock.model";
import { SupplierModel } from "../supplier/supplier.model";

export class RegisterInModel extends BaseModel<string> {
  supplierId: string;
  number: number;
  supplier: SupplierModel;
  donation: boolean;
  applyDate: Date;
  description: string;
  apply: boolean;
  registerInStocks: RegisterInStockModel[];
}
