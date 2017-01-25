gymApp.factory('User', [
    '$rootScope', '$http', '$state',
    function ($rootScope, $http, $state) {
        'use strict';

        User.loggedInstance = 0;

        function User(name, password) {

            this.name = name;
            this.password = password;
            this.privilegeId = 0;

            this.login = function (FailureCallback) {
                if (this.name.length !== 0 && this.password.length !== 0) {

                    $http.post("http://localhost/gymapp/www/php/login.php", {
                        params: {
                            name: this.name,
                            password: this.password
                        }
                    }).then(function (successResponse) {
                        User.setPrivilege(successResponse.data.user_type);
                        if (successResponse.data !== 'null') {
                            if (successResponse.data.user_type === '1') {
                                $state.go('app.subs');
                            } else if (successResponse.data.user_type === '2') {
                                $state.go('app.statistics');
                            }
                        } else {
                            FailureCallback();
                        }

                    });
                }

                User.loggedInstance = this;
            }

        }

        User.setPrivilege = function (privilegeId) {
            User.getInstance().privilegeId = privilegeId;
        }

        User.getInstance = function () {
            return User.loggedInstance;
        }

        return User;
    }
]);