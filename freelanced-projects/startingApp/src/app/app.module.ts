import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from './../pages/home/home';
import { Signup } from './../pages/signup/signup';

import { TodoService } from './../pages/TodoService';
import { AlertSystem } from './../pages/AlertSystem';

const appRoutes: Routes = [
  { path: 'todo/signin', component: HomePage },
  { path: '', redirectTo: '/todo/signin', pathMatch: 'full'},
  { path: 'todo/signup', component: Signup },
];

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Signup
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Signup
  ],
  providers: [TodoService, AlertSystem]
})
export class AppModule { }


// https://angular.io/docs/ts/latest/api/common/index/APP_BASE_HREF-let.html