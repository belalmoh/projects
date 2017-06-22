var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { facebookLogin } from '../pages/signup/facebook/facebook';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
// PAGES
import { MyApp } from './app.component';
import { HomePage } from './../pages/home/home';
import { Signup } from './../pages/signup/signup';
// SERVICES
import { TodoService } from './../pages/services/TodoService';
import { AlertSystem } from './../pages/services/AlertSystem';
// ROUTES
var appRoutes = [
    { path: 'todo/signin', component: HomePage },
    { path: '', component: HomePage },
    { path: 'todo/signup', component: Signup },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
], AppModule);
export { AppModule };
// https://angular.io/docs/ts/latest/api/common/index/APP_BASE_HREF-let.html 
//# sourceMappingURL=app.module.js.map