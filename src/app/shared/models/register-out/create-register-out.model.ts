import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";

export class CreateRegisterOutModel {
    id: string;
    supplierId: string;
    donation: boolean;
    description: string;
    applied: boolean;
    RegisterInStocks: RegisterOutStockModel[] = new Array();
}