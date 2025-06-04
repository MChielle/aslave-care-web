import { BaseModel } from "../base/base.model";
import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";

export class RegisterOutModel extends BaseModel<string> {
    number: number;
    applyDate?: Date;
    description: string;
    apply: boolean;
    registerOutStocks: RegisterOutStockModel[];
}