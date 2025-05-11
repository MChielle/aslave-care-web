import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { NgxMaskModule } from 'ngx-mask';


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
    NgxMaskModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
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
    
    RegistersOutComponent,
    CreateRegisterOutStockComponent,
    UpdateRegisterOutStockComponent,
  ],
  exports: [RouterModule],
})
export class AdminLayoutModule {}
