import { StockModel } from "../stock/stock.model";

export class RegisterOutSelectedSupply {
  stockId: string;
  name: string;
  price: number;
  quantity: number;

    constructor(stockId: string, name: string, price: number, quantity: number) {
        this.stockId = stockId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
