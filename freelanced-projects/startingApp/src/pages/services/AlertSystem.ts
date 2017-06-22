import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertSystem {

    constructor(private alertCtrl: AlertController){}

    public buildNotification(responseTitle, responseMessage) {
        let alert = this.alertCtrl.create({
            title: responseTitle,
            subTitle: responseMessage,
            buttons: ['OK']
        });
        alert.present();
    }
    
    public ErrorResponses = {
        Connection: {
            Title: "Connection Error",
            Message: "Please check your internet connectivity"
        }
    };

    public static FAILED = 0;
    public static SUCCESS = 1;
}