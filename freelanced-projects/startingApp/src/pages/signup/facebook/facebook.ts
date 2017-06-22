import { Facebook } from 'ionic-native';

export class facebookLogin {
    private facebookAppId = 396914047326361;

    constructor() {

    }

    login() {
        Facebook.browserInit(this.facebookAppId, "v2.8");

        Facebook.login(["public_profile"])
            .then(function (response) {
                let userId = response.authResponse.userID;
                let params = new Array();

                //Getting name and gender properties
                Facebook.api("/me?fields=name,gender", params)
                    .then(function (user) {
                        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                        //now we have the users info, let's save it in the NativeStorage
                    })
            }, function (error) {
                console.log(error);
            });
    }
}