import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from "./change-password/change-password.component";

export const authRoutes: Routes = [
  { 
    path: '',
    children: [
        { path: 'signin', component: SigninComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }