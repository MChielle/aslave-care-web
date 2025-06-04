import { BaseModel } from "../base/base.model";
import { RegisterInStockModel } from "../register-in-stock/register-in-stock.model";
import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";

export class StockModel extends BaseModel<string> {
  name: string;
  disable: boolean;
  description: string;
  quantity: number;
  quantityLowWarning: number;
  stockTypeId: string;
  registerInStocks: RegisterInStockModel[];
  registerOutStocks: RegisterOutStockModel[];
}
