gymApp.factory('Player', [
    '$rootScope', '$http', '$state',
    function ($rootScope, $http, $state) {

        function Player(name, mobile, ssn, subscriptionType, subscriptionPeriod) {

            this.name = name;
            this.mobile = mobile;
            this.ssn = ssn;
            this.subscriptionType = subscriptionType;
            this.subscriptionPeriod = subscriptionPeriod;

            this.registerPlayer = function (onSuccess, onError) {
                $http.post("http://localhost/gymapp/www/php/subscription.php", {
                    params: {
                        name: this.name,
                        mobile: this.mobile,
                        ssn: this.ssn,
                        subType: this.subscriptionType,
                        subPeriod: this.subscriptionPeriod
                    }
                }).then(function (successResponse) {
                    onSuccess(successResponse);
                }, function(failureResponse) {
                    onError(failureResponse);
                });
            }

        }

        return Player;
    }
])