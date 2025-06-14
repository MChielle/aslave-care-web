export class DonationReportModel {
  stockName: string;
  stockTypeId: string;
  quantity: number;
  donationDate: number;

  constructor(
    stockName: string,
    stockTypeId: string,
    quantity: number,
    donationDate: number
  ) {
    this.stockName = stockName;
    this.stockTypeId = stockTypeId;
    this.quantity = quantity;
    this.donationDate = donationDate;
  }
}
