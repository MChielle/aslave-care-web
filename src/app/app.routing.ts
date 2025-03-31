import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'signin',
    component: AuthComponent,
    children: [{
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }]
  }, 
  {
    path: 'stock',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    //children: [{
    //  loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    //}]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule { }
