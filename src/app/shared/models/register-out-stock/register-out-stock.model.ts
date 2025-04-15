import { RegisterOutModel } from "../register-out/register-out.model";
import { StockModel } from "../stock/stock.model";

export class RegisterOutStockModel{
    registerInId: string
    registerIn: RegisterOutModel
    stockId: string;
    stock: StockModel;    
    quantity: number;
    price: number;
}