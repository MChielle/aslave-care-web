export class ShoppingPerMonthModel{
    public month: string;
    public total: number;
    
    constructor(month: string, total: number) {
        this.month = month;
        this.total = total;
    }    
}