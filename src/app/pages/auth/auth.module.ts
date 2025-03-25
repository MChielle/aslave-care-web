import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    SignupComponent,
    ChangePasswordComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
