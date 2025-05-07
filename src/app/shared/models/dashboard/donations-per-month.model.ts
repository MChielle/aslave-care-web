export class DonationsPerMonthModel {
    public month: string;
    public total: number;
    
    constructor(month: string, total: number) {
        this.month = month;
        this.total = total;
    }
}