gymApp.controller('MenuCtrl', function ($scope, $stateParams, User) {

  $scope.isVisibleAsAdmin = User.getInstance().privilegeId === '1' ? true : false;
    
});