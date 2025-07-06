import { BaseModel } from "../base/base.model";
import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";

export class CreateRegisterOutModel extends BaseModel<string> {
  supplierId: string;
  donation: boolean;
  description: string;
  apply: boolean;
  applyDate?: Date;
  RegisterInStocks: RegisterOutStockModel[] = new Array();
}
