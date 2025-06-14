import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
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
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
