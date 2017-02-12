var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var TodoService = (function () {
    function TodoService(_http) {
        this._http = _http;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }
    TodoService.prototype.signupUser = function (user) {
        return this._http.post('http://localhost:3000/signup', user, this.options).map(function (response) { return response.json(); });
    };
    TodoService.prototype.testConnection = function () {
        return this._http.get('http://localhost:3000/', this.options).map(function (response) { return response.json(); });
    };
    return TodoService;
}());
TodoService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], TodoService);
export { TodoService };
//# sourceMappingURL=TodoService.js.map