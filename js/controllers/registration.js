vrapt.controller('RegistrationCtrl', ['$scope', 'Authentication', 'FIREBASE_URL', 'VERSION', function($scope, Authentication, FIREBASE_URL, VERSION){
    
    $scope.version = VERSION;

    $scope.login = function(){
        Authentication.login($scope.user);
    };
    
    $scope.register = function(){
        Authentication.register($scope.user);
    }; //register
    
    $scope.logout = function(){
        Authentication.logout();
    };
    
}]); //controller
