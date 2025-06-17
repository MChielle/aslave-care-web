import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./shared/services/auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { AdminLayoutModule } from "./layouts/admin-layout/admin-layout.module";
import { AuthComponent } from "./auth/auth.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
import { ViewRegisterOutStockComponent } from './pages/registers/registers-out/view-register-out-stock/view-register-out-stock.component';
registerLocaleData(localePt);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    AppRoutingModule,
    AuthModule,
    AdminLayoutModule,
  ],
  declarations: [AppComponent, AuthComponent, AdminLayoutComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "BRL" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
