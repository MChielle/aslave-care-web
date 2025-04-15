import { RegisterInStockModel } from "../register-in-stock/register-in-stock.model";

export class CreateRegisterInModel {
    id: string;
    supplierId: string;
    donation: boolean;
    description: string;
    applied: boolean;
    RegisterInStocks: RegisterInStockModel[] = new Array();
}