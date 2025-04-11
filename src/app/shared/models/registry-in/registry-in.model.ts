import { RegistryInStockModel } from "../registry-in-stock/registry-in-stock.model";
import { SupplierModel } from "../supplier/supplier.model";

export class RegistryInModel {
    id: string;
    supplierId: string;
    number: number;
    supplier: SupplierModel;
    donation: boolean;
    applyDate: Date;
    description: string;
    apply: boolean;
    RegistryInStocks: RegistryInStockModel[];
}