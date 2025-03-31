import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { Routes } from '@angular/router';
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { RecoverPasswordComponent } from "./recover-password/recover-password.component";

export const routes: Routes = [
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'recover-password', component: RecoverPasswordComponent }
];