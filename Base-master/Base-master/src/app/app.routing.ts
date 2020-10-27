import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'; 

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { AuthguardGuard } from './authguard.guard';

const routes: Routes =[
  {
    path: '', 
    redirectTo: 'login', //Default url is login when path is empty: ''
    pathMatch: 'full',
  }, 
  {
    path: '', //This tells the router to match the path with '...' and direct to component
	canActivate: [AuthguardGuard],
    component: AdminLayoutComponent,
    children: [{path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}]
  },
  
  { path: 'login', 
	component: LoginFormComponent 
  },
  {
    path: '**', //If key in wrong url will bring to login
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{  //Recognises that this is root router. Performs initial navigation 
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

