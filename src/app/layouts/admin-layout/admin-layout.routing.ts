import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { StockComponent } from 'app/pages/stocks/stocks.component';
import { SuppliersComponent } from 'app/pages/suppliers/suppliers.component';
import { CreateSupplierComponent } from 'app/pages/suppliers/create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from 'app/pages/suppliers/update-supplier/update-supplier.component';
import { CreateStockComponent } from 'app/pages/stocks/create-stock/create-stock.component';
import { UpdateStockComponent } from 'app/pages/stocks/update-stock/update-stock.component';

export const AdminLayoutRoutes: Routes = [   
    
    { path: 'suppliers', component: SuppliersComponent },
    { path: 'create-supplier', component: CreateSupplierComponent },
    { path: 'update-supplier/:id', component: UpdateSupplierComponent },

    { path: 'stocks', component: StockComponent},
    { path: 'create-stock', component: CreateStockComponent },
    { path: 'update-stock/:id', component: UpdateStockComponent},

    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
];
