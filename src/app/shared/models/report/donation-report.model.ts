export class DonationReportModel {
  stockName: string;
  stockTypeId: string;
  quantity: number;
  total: number;

  constructor(
    stockName: string,
    stockTypeId: string,
    quantity: number,
    total: number,
  ) {
    this.stockName = stockName;
    this.stockTypeId = stockTypeId;
    this.quantity = quantity;
    this.total = total;
  }
}
