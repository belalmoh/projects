var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TodoService } from './../TodoService';
var Signup = (function () {
    function Signup(todoService) {
        this.todoService = todoService;
        this.form = new registrationForm();
    }
    Signup.prototype.onSignUpTapped = function () {
        this.todoService.signupUser(this.form.formToJson()).subscribe(function (response) { console.log(response); }, function (error) { console.log(error); });
    };
    return Signup;
}());
Signup = __decorate([
    Component({
        selector: 'signup',
        templateUrl: 'signup.html'
    }),
    __metadata("design:paramtypes", [TodoService])
], Signup);
export { Signup };
var registrationForm = (function () {
    function registrationForm() {
        this.userName = "";
        this.userEmail = "";
        this.userPassword = "";
        this.userRepeatedPassword = "";
    }
    registrationForm.prototype.isEmail = function (input) {
        return ((input.indexOf('@') !== -1) && (input.indexOf('.') !== -1) ? true : false);
    };
    registrationForm.prototype.isEqual = function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        return elements.every(function (val) { return val == elements[0]; });
    };
    registrationForm.prototype.isFilledForm = function () {
        return this.formToArray().every(function (x) { return x.length !== 0; });
    };
    registrationForm.prototype.isValidForm = function () {
        return (this.isEmail(this.userEmail) && this.isEqual(this.userPassword, this.userRepeatedPassword)
            && this.isFilledForm());
    };
    registrationForm.prototype.submitForm = function () {
    };
    registrationForm.prototype.formToJson = function () {
        return JSON.stringify({
            userName: this.userName,
            userEmail: this.userEmail,
            userPassword: this.userPassword
        });
    };
    registrationForm.prototype.formToArray = function () {
        return [this.userName, this.userPassword,
            this.userEmail, this.userRepeatedPassword];
    };
    return registrationForm;
}());
//# sourceMappingURL=signup.js.map