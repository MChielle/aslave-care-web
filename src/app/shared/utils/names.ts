import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StockNames {
  get URL_LOWER_CASE() {
    return "stock";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "stocks";
  }
  get STOCK() {
    return "Estoque";
  }
  get STOCK_LOWER_CASE() {
    return "estoque";
  }
  get STOCKS() {
    return "Estoques";
  }
  get STOCKS_LOWER_CASE() {
    return "estoques";
  }
}

@Injectable({
  providedIn: "root",
})
export class SupplierNames {
  get URL_LOWER_CASE() {
    return "supplier";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "suppliers";
  }
  get SUPPLIER() {
    return "Fornecedor";
  }
  get SUPPLIER_LOWER_CASE() {
    return "fornecedor";
  }
  get SUPPLIERS() {
    return "Fornecedores";
  }
  get SUPPLIERS_LOWER_CASE() {
    return "fornecedores";
  }
}

@Injectable({
  providedIn: "root",
})
export class RegistryInNames {
  get URL_LOWER_CASE() {
    return "registryin";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "registryins";
  }
  get REGISTRY_IN() {
    return "Entrada";
  }
  get REGISTRY_IN_LOWER_CASE() {
    return "entrada";
  }
  get REGISTRY_INS() {
    return "Entradas";
  }
  get REGISTRY_INS_LOWER_CASE() {
    return "entrada";
  }
}