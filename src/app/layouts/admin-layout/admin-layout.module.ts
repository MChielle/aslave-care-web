import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/users/user-profile/user-profile.component";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { StockComponent } from "app/pages/stocks/stocks.component";
import { SuppliersComponent } from "app/pages/suppliers/suppliers.component";
import { CreateSupplierComponent } from "app/pages/suppliers/create-supplier/create-supplier.component";
import { UpdateSupplierComponent } from "app/pages/suppliers/update-supplier/update-supplier.component";
import { CreateStockComponent } from "app/pages/stocks/create-stock/create-stock.component";
import { UpdateStockComponent } from "app/pages/stocks/update-stock/update-stock.component";
import { CreateRegisterInStockComponent } from "app/pages/registers/registers-in/create-register-in-stock/create-register-in-stock.component";
import { AutocompleteComponent } from "app/shared/components/autocomplete/autocomplete.component";
import { CreateRegisterOutStockComponent } from "app/pages/registers/registers-out/create-register-out-stock/create-register-out-stock.component";
import { RegistersInComponent } from "app/pages/registers/registers-in/registers-in.component";
import { RegistersOutComponent } from "app/pages/registers/registers-out/registers-out.component";
import { UpdateRegisterOutStockComponent } from "app/pages/registers/registers-out/update-register-out-stock/update-register-out-stock.component";
import { UpdateRegisterInStockComponent } from "app/pages/registers/registers-in/update-register-in-stock/update-register-in-stock.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { NgxMaskModule } from "ngx-mask";
import { RestockReportComponent } from "app/pages/reports/restock-report/restock-report.component";
import { ReportsComponent } from "app/pages/reports/reports.component";
import { UsersComponent } from "app/pages/users/users.component";
import { UpdateUserComponent } from "app/pages/users/update-user/update-user.component";
import { CreateUserComponent } from "app/pages/users/create-user/create-user.component";
import { DonationsReportComponent } from "app/pages/reports/donations-report/donations-report.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { StockReportComponent } from "app/pages/reports/stock-report/stock-report.component";
import { ViewRegisterInStockComponent } from "app/pages/registers/registers-in/view-register-in-stock/view-register-in-stock.component";
import { ViewRegisterOutStockComponent } from "app/pages/registers/registers-out/view-register-out-stock/view-register-out-stock.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ConsumptionReportComponent } from "app/pages/reports/consumption-report/consumption-report.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgxMaskModule,
  ],
  declarations: [
    DashboardComponent,
    AutocompleteComponent,
    
    SuppliersComponent,
    CreateSupplierComponent,
    UpdateSupplierComponent,
    
    StockComponent,
    CreateStockComponent,
    UpdateStockComponent,

    RegistersInComponent,
    CreateRegisterInStockComponent,
    UpdateRegisterInStockComponent,
    ViewRegisterInStockComponent,

    RegistersOutComponent,
    CreateRegisterOutStockComponent,
    UpdateRegisterOutStockComponent,
    ViewRegisterOutStockComponent,

    StockReportComponent,
    DonationsReportComponent,
    RestockReportComponent,
    ReportsComponent,
    ConsumptionReportComponent,

    UsersComponent,
    UserProfileComponent,
    UpdateUserComponent,
    CreateUserComponent,
  ],
  exports: [RouterModule],
})
export class AdminLayoutModule {}
