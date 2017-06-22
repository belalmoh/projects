import { facebookLogin } from '../pages/signup/facebook/facebook';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';


// PAGES
import { MyApp } from './app.component';
import { HomePage } from './../pages/home/home';
import { Signup } from './../pages/signup/signup';


// SERVICES
import { TodoService } from './../pages/services/TodoService';
import { AlertSystem } from './../pages/services/AlertSystem';

// ROUTES
const appRoutes: Routes = [
  { path: 'todo/signin', component: HomePage },
  { path: '', component: HomePage },
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
  providers: [TodoService, AlertSystem, facebookLogin]
})
export class AppModule { }


// https://angular.io/docs/ts/latest/api/common/index/APP_BASE_HREF-let.html