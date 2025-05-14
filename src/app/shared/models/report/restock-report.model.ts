export class RestockReportModel {
  name: string;
  supplierName:string;
  stockTypeId: string;
  quantity: number;
  lowerPrice: number;
  
  constructor(name: string, supplierName: string, stockTypeId: string, quantity: number, lowerPrice){
    this.name = name;
    this.supplierName = supplierName;
    this.stockTypeId = stockTypeId;
    this.quantity = quantity;
    this.lowerPrice = lowerPrice;
  }
}