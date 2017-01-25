// /**
//  * NgModule -> used for specifiying the modules of the app
//  * Component -> used for creating a component
//  */
// import {NgModule, Component} from '@angular/core';

// // needed to running angular2 websites.
// import {BrowserModule} from '@angular/platform-browser';

// // this will render the website.
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// /**
//  * creation of the first component of our app.
//  * @export
//  * @class AppComponent
//  */
// @Component({
//     selector: "test-app",
//     template: "<h1>Hello {{name}} to your first Angular2 App</h1>"
// })
// export class AppComponent {
//     name: string = "Belal";
// }



// /**
//  * creation of the module that has the bootstrap module (entry point).
//  * @class AppModule
//  */
// @NgModule({
//     declarations: [AppComponent], // the components of the app goes here
//     imports: [BrowserModule], // the requirements for the app to launch 
//     bootstrap: [AppComponent]
// })
// class AppModule {

// }


// // defining the root (entry point) of the app for the browser to render.
// platformBrowserDynamic().bootstrapModule(AppModule);