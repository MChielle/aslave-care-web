export class MonthTopDonersModel{
    public name: string;
    public quantity: number;
    
    constructor(name: string, quantity: number) {
        this.name = name;
        this.quantity = quantity;
    }    
}