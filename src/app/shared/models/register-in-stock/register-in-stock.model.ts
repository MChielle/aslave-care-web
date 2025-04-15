import { RegisterInModel } from "../register-in/register-in.model";
import { StockModel } from "../stock/stock.model";

export class RegisterInStockModel{
    registerInId: string
    registerIn: RegisterInModel
    stockId: string;
    stock: StockModel;    
    quantity: number;
    price: number;
}