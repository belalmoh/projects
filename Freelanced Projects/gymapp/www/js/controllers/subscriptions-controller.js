gymApp.controller('SubscriptionsCtrl', function ($scope, $stateParams, User, Player) {
    $scope.player = {
        name: "",
        mobile: "",
        ssn: "",
        subType: "",
        subPeriod: "",

        clearFields: function () {
            this.name = "";
            this.mobile = "";
            this.ssn = "";
            this.subType = "";
            this.subPeriod = "";

            $scope.pricesBtns.btn1 = false;
            $scope.pricesBtns.btn2 = false;

            $scope.periodsBtns.btn1 = false;
            $scope.periodsBtns.btn2 = false;
            $scope.periodsBtns.btn3 = false;
        },

        subscribe: function () {
            var newPlayer = new Player(this.name, this.mobile, this.ssn, this.subType, this.subPeriod);
            console.log(this);
            newPlayer.registerPlayer(
                function (successResponse) {
                    $scope.player.clearFields();
                }
            );
        },

        isNull: function (value) {
            var isNull = (value === null || value === undefined || value.length === 0 || value === "" || value === false? true : false);
            return isNull;
        },

        isValidForm: function () {
            if ((this.isNull(this.name) || this.isNull(this.mobile) || this.isNull(this.ssn) || this.isNull(this.subType) || this.isNull(this.subPeriod))) {
                alert("بالرجاء ملأ الخانات بالقيم الصحيحة");
            }            
        }
    };

    $scope.pricesBtns = {
        btn1: false,
        btn2: false,
        length: 2
    };

    $scope.periodsBtns = {
        btn1: false,
        btn2: false,
        btn3: false,
        length: 3
    };

    $scope.testMsg = "test";

    $scope.radioBtn = function (label, btnsObject) {
        for (var i = 1; i <= btnsObject.length; i++) {
            if (i !== label) {
                $scope[btnsObject]['btn' + i] = false;
            } else {
                $scope[btnsObject]['btn' + i] = true;
            }
        }
    }

    $scope.isTrue = function (element) {
        if (element === true) {
            element = false
            return element;
        }
    }
})