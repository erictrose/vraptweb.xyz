vrapt.factory('Authentication', ['$rootScope', '$firebaseAuth', '$location', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', function($rootScope, $firebaseAuth, $location, $firebaseObject, $firebaseArray, FIREBASE_URL){
    
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser){
        if(authUser){
            var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = '';
        }
    })
    
    var returnObject = {
        login: function(user){
            auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(regUser){
                $location.path('/vrapt');
//                if(!$scope.$$phase) $scope.$apply();
            }).catch(function(error){
                $rootScope.message = error.message;
            });
        }, //login
        logout: function(){
            return auth.$unauth();
        }, //logout
        requireAuth: function(){
            return auth.$requireAuth();
        }, //require auth
        register: function(user){
            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(regUser){
                
                
//                get bld count from firebase
                var bldCountRef = new Firebase(FIREBASE_URL + 'stats').child('bldcount');
                var bldCount = $firebaseObject(bldCountRef);
                
                    
//                get apt count from firebase
                var aptCountRef = new Firebase(FIREBASE_URL + 'stats').child('aptcount');
                var aptCount = $firebaseObject(aptCountRef);
                
//                when firebase data is loaded
                bldCount.$loaded().then(function(){
                aptCount.$loaded().then(function(){

//                  create new apt in current building
                    var bldRef = new Firebase(FIREBASE_URL + 'bld/0/apt/' +aptCount.$value).set({
                        date: Firebase.ServerValue.TIMESTAMP,
                        aptnum: aptCount.$value + 1,
                        bldnum: 0,
                        owner: regUser.uid,
                        ownerfname: user.fname,
                        ownerlname: user.lname,
                        profilepic: 'http://vrapt.xyz/static/images/ui/default-user.png',
                        status: 'set a status',
                        "walls": {
                            "wall1" : "http://www.github.com", 
                            "wall2" : "http://www.janusvr.com", 
                            "wall3" : "http://www.reddit.com"
                        },
                        "links": {
                            "link1" : "http://www.janusvr.com", 
                            "link2" : "http://www.vrsites.com"
                        }
                    });
                    
                    var regRef = new Firebase(FIREBASE_URL + 'users').child(regUser.uid).set({
                        date: Firebase.ServerValue.TIMESTAMP,
                        regUser: regUser.uid,
                        firstname: user.fname,
                        lastname: user.lname,
                        email: user.email,
                        bldnum: 0,
                        aptnum: aptCount.$value + 1
                    }); //user info
                    
//                    increment apt count
                    aptCount.$value = aptCount.$value + 1;
                    aptCount.$save();

                    returnObject.login(user);
                    
                }); //aptcount loaded
                }); //bldcount loaded
                
                
//                increment bld and apt count
                
                
                
                
//                var regRef = new Firebase(FIREBASE_URL + 'users').child(regUser.uid).set({
//                    date: Firebase.ServerValue.TIMESTAMP,
//                    regUser: regUser.uid,
//                    firstname: user.fname,
//                    lastname: user.lname,
//                    email: user.email,
//                    bldnum: ,
//                    aptnum: ,
//                }); //user info
//                
//                returnObject.login(user);
                
            }).catch(function(error){
                $rootScope.message = error.message;
            }) //createUser
        } //register
    };
    
    return returnObject;
    
}]); //factory
