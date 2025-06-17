import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/users/user-profile/user-profile.component";
import { StockComponent } from "app/pages/stocks/stocks.component";
import { SuppliersComponent } from "app/pages/suppliers/suppliers.component";
import { CreateSupplierComponent } from "app/pages/suppliers/create-supplier/create-supplier.component";
import { UpdateSupplierComponent } from "app/pages/suppliers/update-supplier/update-supplier.component";
import { CreateStockComponent } from "app/pages/stocks/create-stock/create-stock.component";
import { UpdateStockComponent } from "app/pages/stocks/update-stock/update-stock.component";
import { CreateRegisterInStockComponent } from "app/pages/registers/registers-in/create-register-in-stock/create-register-in-stock.component";
import { CreateRegisterOutStockComponent } from "app/pages/registers/registers-out/create-register-out-stock/create-register-out-stock.component";
import { RegistersInComponent } from "app/pages/registers/registers-in/registers-in.component";
import { RegistersOutComponent } from "app/pages/registers/registers-out/registers-out.component";
import { UpdateRegisterOutStockComponent } from "app/pages/registers/registers-out/update-register-out-stock/update-register-out-stock.component";
import { UpdateRegisterInStockComponent } from "app/pages/registers/registers-in/update-register-in-stock/update-register-in-stock.component";
import { ReportsComponent } from "app/pages/reports/reports.component";
import { RestockReportComponent } from "app/pages/reports/restock-report/restock-report.component";
import { UsersComponent } from "app/pages/users/users.component";
import { UserGuard } from "app/shared/guards/user.guard";
import { UpdateUserComponent } from "app/pages/users/update-user/update-user.component";
import { CreateUserComponent } from "app/pages/users/create-user/create-user.component";
import { DonationsReportComponent } from "app/pages/reports/donations-report/donations-report.component";
import { StockReportComponent } from "app/pages/reports/stock-report/stock-report.component";
import { ViewRegisterInStockComponent } from "app/pages/registers/registers-in/view-register-in-stock/view-register-in-stock.component";
import { ViewRegisterOutStockComponent } from "app/pages/registers/registers-out/view-register-out-stock/view-register-out-stock.component";

export const AdminLayoutRoutes: Routes = [
  { path: "suppliers", component: SuppliersComponent },
  { path: "create-supplier", component: CreateSupplierComponent },
  { path: "update-supplier/:id", component: UpdateSupplierComponent },

  { path: "stocks", component: StockComponent },
  { path: "create-stock", component: CreateStockComponent },
  { path: "update-stock/:id", component: UpdateStockComponent },

  { path: "registers-in", component: RegistersInComponent },
  { path: "create-register-in", component: CreateRegisterInStockComponent },
  { path: "update-register-in/:id", component: UpdateRegisterInStockComponent },
  { path: "view-register-in/:id", component: ViewRegisterInStockComponent },

  { path: "registers-out", component: RegistersOutComponent },
  { path: "create-register-out", component: CreateRegisterOutStockComponent },
  { path: "update-register-out/:id", component: UpdateRegisterOutStockComponent,},
  { path: "view-register-out/:id", component: ViewRegisterOutStockComponent },

  { path: "reports", component: ReportsComponent },
  { path: "restock-report", component: RestockReportComponent },
  { path: "donations-report", component: DonationsReportComponent },
  { path: "stock-report", component: StockReportComponent },
  

  { path: "users", canActivate: [UserGuard], component: UsersComponent },
  { path: "update-user", canActivate: [UserGuard], component: UpdateUserComponent },
  { path: "create-user", canActivate: [UserGuard], component: CreateUserComponent },
  { path: "user-profile", component: UserProfileComponent },

  { path: "dashboard", component: DashboardComponent },
];
