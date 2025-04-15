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
export class RegisterInNames {
  get API_URL_LOWER_CASE() {
    return "registerin";
  }  
  get URL_LOWER_CASE() {
    return "register-in";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "register-ins";
  }
  get REGISTER_IN() {
    return "Entrada";
  }
  get REGISTER_IN_LOWER_CASE() {
    return "entrada";
  }
  get REGISTER_INS() {
    return "Entradas";
  }
  get REGISTER_INS_LOWER_CASE() {
    return "entrada";
  }
}

@Injectable({
  providedIn: "root",
})
export class RegisterOutNames {
  get API_URL_LOWER_CASE() {
    return "registerout";
  }  
  get URL_LOWER_CASE() {
    return "register-out";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "registers-out";
  }
  get REGISTER_IN() {
    return "Entrada";
  }
  get REGISTER_IN_LOWER_CASE() {
    return "entrada";
  }
  get REGISTERS_IN() {
    return "Entradas";
  }
  get REGISTERS_IN_LOWER_CASE() {
    return "entradas";
  }
}

@Injectable({
  providedIn: "root",
})
export class RegistersNames {
  get URL_LOWER_CASE_PLURAL() {
    return "registers";
  }
}