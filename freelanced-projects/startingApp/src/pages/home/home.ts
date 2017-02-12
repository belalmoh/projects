import { TodoService } from './../TodoService';

import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: User = new User("", "");
  constructor(public alertCtrl: AlertController, private appService: TodoService) {

  }


  onSignInTapped() {
    // Limiting the incorrect patterns.
    // Sending the details to the todo page {Username , Encrypted Data(Username+Current Date)}.
  }

  onForgotTapped() {
    // Moving to the forgot page.
  }

  onSigninSocialTapped(socialType: string) {
    // Viewing modal that has social signing.
  }

}

class User {
  constructor(public name: string, public password: string) { }

  signIn() {

  }

  signUp() {

  }

  forgot() {

  }

  toJson() {
    return JSON.stringify(this);
  }
}
