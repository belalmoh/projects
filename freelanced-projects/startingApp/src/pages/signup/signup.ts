import { Component } from '@angular/core';
import { ImagePicker } from 'ionic-native';

import { AlertSystem } from './../AlertSystem';
import { TodoService } from './../TodoService';

@Component({
    selector: 'signup',
    templateUrl: 'signup.html'
})
export class Signup {
    public form: registrationForm = new registrationForm();

    constructor(public todoService: TodoService, public alertSystem: AlertSystem) {

    }

    onAvatarTapped() {
        ImagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => { });
    }

    onSignUpTapped() {
        this.todoService.signupUser(this.form.formToJson()).subscribe(
            response => {
                if (!response.statusId) {
                    this.alertSystem.buildNotification(response.message.title, response.message.body);
                } else {
                    this.alertSystem.buildNotification(response.message.title, response.message.body);
                    // redirect to todos b2a.
                }
            },
            error => { this.alertSystem.buildNotification(this.alertSystem.ErrorResponses.Connection.Title, this.alertSystem.ErrorResponses.Connection.Message); }
        );
    }
}

class registrationForm {
    public userName: string = "";
    public userEmail: string = "";
    public userPassword: string = "";
    public userRepeatedPassword: string = "";

    constructor() {

    }

    isEmail(input: string) {
        return ((input.indexOf('@') !== -1) && (input.indexOf('.') !== -1) ? true : false);
    }

    isEqual(...elements) {
        return elements.every((val) => val == elements[0]);
    }

    isFilledForm() {
        return this.formToArray().every(x => { return x.length !== 0 });
    }

    isValidForm() {
        return (this.isEmail(this.userEmail) && this.isEqual(this.userPassword, this.userRepeatedPassword)
            && this.isFilledForm());
    }

    submitForm() {

    }


    formToJson() {
        return JSON.stringify({
            userName: this.userName,
            userEmail: this.userEmail,
            userPassword: this.userPassword
        });
    }

    formToArray() {
        return [this.userName, this.userPassword,
        this.userEmail, this.userRepeatedPassword];
    }

}