import { RegistryInModel } from "../registry-in/registry-in.model";
import { StockModel } from "../stock/stock.model";

export class RegistryInStockModel{
    registryInId: string
    registryIn: RegistryInModel
    stockId: string;
    stock: StockModel;    
    quantity: number;
    price: number;
}