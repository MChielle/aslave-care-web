export class StockReportModel {
  stockName: string;
  stockTypeId: string;
  quantity: number;
  
  constructor(stockName: string, stockTypeId: string, quantity: number){
    this.stockName = stockName;
    this.stockTypeId = stockTypeId;
    this.quantity = quantity;
  }
}