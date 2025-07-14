import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    SignupComponent,
    ChangePasswordComponent,
    SigninComponent,
    RecoverPasswordComponent,    
  ],
  exports:[RouterModule]
})
export class AuthModule { }
