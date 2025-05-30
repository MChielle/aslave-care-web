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
    return "registers-in";
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
    return "entradas";
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
    return "Saida";
  }
  get REGISTER_IN_LOWER_CASE() {
    return "saida";
  }
  get REGISTERS_IN() {
    return "Saidas";
  }
  get REGISTERS_IN_LOWER_CASE() {
    return "saidas";
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


@Injectable({
  providedIn: "root",
})
export class StockTypeNames {
  get API_URL_LOWER_CASE() {
    return "stocktype";
  }  
  get URL_LOWER_CASE() {
    return "stocktype";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "stock-types";
  }
  get REGISTER_IN() {
    return "Tipo de Estoque";
  }
  get REGISTER_IN_LOWER_CASE() {
    return "tipo de estoque";
  }
  get REGISTERS_IN() {
    return "Tipos de Estoque";
  }
  get REGISTERS_IN_LOWER_CASE() {
    return "tipos de estoque";
  }
}

@Injectable({
  providedIn: "root",
})
export class UserNames {
  get API_URL_LOWER_CASE() {
    return "user";
  }  
  get URL_LOWER_CASE() {
    return "user";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "users";
  }
  get USER() {
    return "Usuário";
  }
  get USER_LOWER_CASE() {
    return "usuário";
  }
  get USERS() {
    return "Usuários";
  }
  get USERS_LOWER_CASE() {
    return "usuários";
  }
}

@Injectable({
  providedIn: "root",
})
export class SignInNames {
  get API_URL_LOWER_CASE() {
    return "signin";
  }  
  get URL_LOWER_CASE() {
    return "signin";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "signins";
  }
}

@Injectable({
  providedIn: "root",
})
export class EmployeeNames {
  get API_URL_LOWER_CASE() {
    return "employee";
  }  
  get URL_LOWER_CASE() {
    return "employee";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "employees";
  }
  get EMPLOYEE() {
    return "Colaborador";
  }
  get EMPLOYEE_LOWER_CASE() {
    return "colaborador";
  }
  get EMPLOYEES() {
    return "Colaboradores";
  }
  get EMPLOYEES_LOWER_CASE() {
    return "colaboradores";
  }
}

@Injectable({
  providedIn: "root",
})
export class ManagerNames {
  get API_URL_LOWER_CASE() {
    return "manager";
  }  
  get URL_LOWER_CASE() {
    return "manager";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "managers";
  }
  get MANAGER() {
    return "Administrador";
  }
  get MANAGER_LOWER_CASE() {
    return "administrador";
  }
  get MANAGERS() {
    return "Administradores";
  }
  get MANAGERS_LOWER_CASE() {
    return "administradores";
  }
}

@Injectable({
  providedIn: "root",
})
export class RoleNames {
  get API_URL_LOWER_CASE() {
    return "role";
  }  
  get URL_LOWER_CASE() {
    return "role";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "roles";
  }
}

@Injectable({
  providedIn: "root",
})
export class TaskNoteNames {
  get API_URL_LOWER_CASE() {
    return "tasknote";
  }  
  get URL_LOWER_CASE() {
    return "tasknote";
  }
  get URL_LOWER_CASE_PLURAL() {
    return "tasknotes";
  }
}

