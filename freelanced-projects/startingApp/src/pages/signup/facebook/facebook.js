import { Facebook } from 'ionic-native';
var facebookLogin = (function () {
    function facebookLogin() {
        this.facebookAppId = 396914047326361;
    }
    facebookLogin.prototype.login = function () {
        Facebook.browserInit(this.facebookAppId, "v2.8");
        Facebook.login(["public_profile"])
            .then(function (response) {
            var userId = response.authResponse.userID;
            var params = new Array();
            //Getting name and gender properties
            Facebook.api("/me?fields=name,gender", params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                //now we have the users info, let's save it in the NativeStorage
            });
        }, function (error) {
            console.log(error);
        });
    };
    return facebookLogin;
}());
export { facebookLogin };
//# sourceMappingURL=facebook.js.map