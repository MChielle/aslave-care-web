import { RegisterOutModel } from "../register-out/register-out.model";
import { StockModel } from "../stock/stock.model";

export class RegisterOutStockModel{
    registerOutId: string
    registerOut: RegisterOutModel
    stockId: string;
    stock: StockModel;    
    quantity: number;
    price: number;
}