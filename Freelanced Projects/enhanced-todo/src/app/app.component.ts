import {Component} from '@angular/core';

@Component({
    selector: 'app-component',
    template: `<h1>I love you {{name}}</h1>`
})
export class AppComponent{
    name: string = "Belal";
}