import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { StockComponent } from 'app/pages/stocks/stocks.component';
import { SuppliersComponent } from 'app/pages/suppliers/suppliers.component';
import { CreateSupplierComponent } from 'app/pages/suppliers/create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from 'app/pages/suppliers/update-supplier/update-supplier.component';
import { CreateStockComponent } from 'app/pages/stocks/create-stock/create-stock.component';
import { UpdateStockComponent } from 'app/pages/stocks/update-stock/update-stock.component';
import { CreateRegistryInStockComponent } from 'app/pages/registers/create-registry-in-stock/create-registry-in-stock.component';
import { SearchableSelectComponent } from 'app/shared/components/searchable-select/searchable-select.component';
import { AutocompleteComponent } from 'app/shared/components/autocomplete/autocomplete.component';
import { RegistersComponent as RegistersComponent } from 'app/pages/registers/registers.component';

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
    SearchableSelectComponent,
    AutocompleteComponent,

    SuppliersComponent,
    CreateSupplierComponent,
    UpdateSupplierComponent,

    StockComponent,
    CreateStockComponent,
    UpdateStockComponent,

    RegistersComponent,
    CreateRegistryInStockComponent,    
  ],
  exports: [RouterModule]})

export class AdminLayoutModule {}
