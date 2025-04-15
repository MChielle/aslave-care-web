import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";
import { SupplierModel } from "../supplier/supplier.model";

export class RegisterOutModel {
    id: string;
    supplierId: string;
    number: number;
    supplier: SupplierModel;
    donation: boolean;
    applyDate: Date;
    description: string;
    apply: boolean;
    RegisterInStocks: RegisterOutStockModel[];
}