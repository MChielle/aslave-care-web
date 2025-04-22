import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";

export class RegisterOutModel {
    id: string;
    number: number;
    applyDate: Date;
    description: string;
    apply: boolean;
    registerOutStocks: RegisterOutStockModel[];
}