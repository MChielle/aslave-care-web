import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { RecoverPasswordComponent } from "./recover-password/recover-password.component";
import { AuthGuard } from "app/shared/services/auth/auth.guard";
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';


export const authRoutes: Routes = [
  { 
    path: '',
    children: [
        { path: 'signin', component: SigninComponent, 
          children: [
            {
              path: 'core',
              canActivate: [AuthGuard],
              component: AdminLayoutComponent,
            }
          ]
        },
        { path: 'signup', component: SignupComponent },
        { path: 'change-password', component: ChangePasswordComponent },
        { path: 'recover-password', component: RecoverPasswordComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }