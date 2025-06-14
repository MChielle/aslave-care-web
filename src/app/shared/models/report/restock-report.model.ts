export class RestockReportModel {
  stockName: string;
  supplierName:string;
  stockTypeId: string;
  quantity: number;
  lowerPrice: number;
  
  constructor(stockName: string, supplierName: string, stockTypeId: string, quantity: number, lowerPrice){
    this.stockName = stockName;
    this.supplierName = supplierName;
    this.stockTypeId = stockTypeId;
    this.quantity = quantity;
    this.lowerPrice = lowerPrice;
  }
}