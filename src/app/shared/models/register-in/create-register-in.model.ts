import { BaseModel } from "../base/base.model";
import { RegisterInStockModel } from "../register-in-stock/register-in-stock.model";

export class CreateRegisterInModel extends BaseModel<string> {
  supplierId: string;
  donation: boolean;
  description: string;
  apply: boolean;
  applyDate?: Date;
  RegisterInStocks: RegisterInStockModel[] = new Array();
}
