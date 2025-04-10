import { RegistryInStockModel } from "../registry-in-stock/registry-in-stock.model";

export class CreateRegistryInModel {
    id: string;
    supplierId: string;
    donation: boolean;
    description: string;
    applied: boolean;
    RegistryInStocks: RegistryInStockModel[] = new Array();
}