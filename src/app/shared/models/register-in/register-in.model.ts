import { RegisterInStockModel } from "../register-in-stock/register-in-stock.model";
import { SupplierModel } from "../supplier/supplier.model";

export class RegisterInModel {
    id: string;
    supplierId: string;
    number: number;
    supplier: SupplierModel;
    donation: boolean;
    applyDate: Date;
    description: string;
    apply: boolean;
    RegisterInStocks: RegisterInStockModel[];
}