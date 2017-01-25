import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>Hello {{name}} to Angular2 Project</h1>'
})
export class AppComponent{
    name = 'Belal';
}