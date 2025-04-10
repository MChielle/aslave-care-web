import { RegistryInStockModel } from "../registry-in-stock/registry-in-stock.model";
import { SupplierModel } from "../supplier/supplier.model";

export class RegistryInModel {
    id: string;
    supplierId: string;
    supplier: SupplierModel;
    donation: boolean;
    applyDate: Date;
    description: string;
    applied: boolean;
    RegistryInStocks: RegistryInStockModel[];
}