//console.log('app loading');

var vrapt = angular.module('vrapt', [
    'ngRoute',
    'firebase',
    'cloudinary',
    'ngFileUpload'
])
    .constant('FIREBASE_URL', 'https://vrapt.firebaseio.com/')
    .constant('VERSION', '1.0');

vrapt.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
        if(error="AUTH_REQUIRED"){
            $rootScope.message = 'sorry, you must log in to access this page';
            $location.path('/login');
        };
    })
}]);

vrapt.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationCtrl'
        })
        .when('/vrapt', {
            templateUrl: 'views/app.html',
            controller: 'VraptCtrl',
            resolve: {
                currentAuth: function(Authentication){
                    return Authentication.requireAuth();
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

vrapt.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "dgs2b0bpa")
      .set("upload_preset", "vrapt-profilepics");
}]);