vrapt.controller('VraptCtrl', ['$scope', 'Authentication', '$rootScope', '$firebaseObject', '$firebaseArray', 'Upload', 'cloudinary', 'FIREBASE_URL', function($scope, Authentication, $rootScope, $firebaseObject, $firebaseArray, $upload, cloudinary, FIREBASE_URL){
    
//////////////////////////// MODAL
    
    $scope.messageModalOn = false;
    $scope.changeWallsModalOn = false;
    $scope.changeportalsModalOn = false;
    
    //message modal
    $scope.closeModal = function(){
        $scope.messageModalOn = false;
    };
    
    $scope.openMessageModal = function(){
        $scope.messageModalOn = true;
    };
    
    //change walls modal
    $scope.closeChangeWallsModal = function(){
        $scope.changeWallsModalOn = false;
    };
    
    $scope.openChangeWallsModal = function(){
        $scope.changeWallsModalOn = true;
    };
    
    //change portals modal
    $scope.closeChangePortalsModal = function(){
        $scope.changePortalsModalOn = false;
    };
    
    $scope.openChangePortalsModal = function(){
        $scope.changePortalsModalOn = true;
    };
    
//////////////////////////// SET WALLS
    
    $scope.setMyWall1 = function(){
        console.log('save wall 1 clicked');
        //set in firebase
        var myWall1Ref = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/walls/wall1');
        var myWall1 = new $firebaseObject(myWall1Ref);
        myWall1.$value = $scope.myWall1;
        myWall1.$save();
        $scope.msg = 'wall 1 saved as ' +myWall1;
        $scope.myWall1 = '';
    };
    
    $scope.setMyWall2 = function(){
        console.log('save wall 2 clicked');
        //set in firebase
        var myWall2Ref = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/walls/wall2');
        var myWall2 = new $firebaseObject(myWall2Ref);
        myWall2.$value = $scope.myWall2;
        myWall2.$save();
        $scope.msg = 'wall 2 saved as ' +myWall2;
        $scope.myWall2 = '';
    };
    
    $scope.setMyWall3 = function(){
        console.log('save wall 3 clicked');
        //set in firebase
        var myWall3Ref = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/walls/wall3');
        var myWall3 = new $firebaseObject(myWall3Ref);
        myWall3.$value = $scope.myWall3;
        myWall3.$save();
        $scope.msg = 'wall 3 saved as ' +myWall3;
        $scope.myWall3 = '';
    };
    
//////////////////////////// SET PORTALS
    
    $scope.setMyPortal1 = function(){
        console.log('save portal 1 clicked');
        //set in firebase
        var myPortal1Ref = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/links/link1');
        var myPortal1 = new $firebaseObject(myPortal1Ref);
        myPortal1.$value = $scope.myPortal1;
        myPortal1.$save();
        $scope.msg = 'portal 1 saved as ' +myPortal1;
        $scope.myPortal1 = '';
    };
    
    $scope.setMyPortal2 = function(){
        console.log('save portal 2 clicked');
        //set in firebase
        var myPortal2Ref = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/links/link2');
        var myPortal2 = new $firebaseObject(myPortal2Ref);
        myPortal2.$value = $scope.myPortal2;
        myPortal2.$save();
        $scope.msg = 'portal 2 saved as ' +myPortal2;
        $scope.myPortal2 = '';
    };
    
//////////////////////////// SET STATUS
    
    $scope.setMyStatus = function(){
        //set in firebase
        var myStatusRef = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/status');
        var myStatus = new $firebaseObject(myStatusRef);
        myStatus.$value = $scope.myUserStatus;
        myStatus.$save();
        //change status on tower
        $('#myUserStatus').html($scope.myUserStatus);
        $scope.myUserStatus = '';
    };
    
//////////////////////////// SEND MESSAGE
    
    //send message scoped function
    $scope.sendMessageTo = function(bld,apt){
        $scope.msg = 'message: "' +$scope.sendMessageBody[apt-1] +'" sent to bld#' +bld +' apt#' +apt;
        var aptFix = apt-1;
        //get firebase link
        var fbSendMessageRef = new Firebase(FIREBASE_URL + 'bld/' +bld + '/apt/' +aptFix + '/messages');
        //bind firebase array to scope
        var fbSendMessage = $firebaseArray(fbSendMessageRef);
        //get timestamp
        var msgTimestamp = new Date().getDate();
        //holder var
        var sendItOver = $scope.sendMessageBody[apt-1];
        //add message to database
        fbSendMessage.$add({
            sendTime: msgTimestamp,
            sender : {
                id : $rootScope.currentUser.$id,
                firstname : $rootScope.currentUser.firstname,
                lastname : $rootScope.currentUser.lastname,
                bld : $rootScope.currentUser.bldnum,
                apt : $rootScope.currentUser.aptnum,
                email : $rootScope.currentUser.email
            },
            body : sendItOver
        })
//        .then(function(ref){
//            
//        });
        $scope.sendMessageBody = '';
//        console.log($scope.sendMessageBody[0]);
    };
    
//////////////////////////// EMPTY SLOT CLICKS
    
    $scope.slotTwoClick = function(){
        $scope.msg = 'changing walls';
        console.log('changing walls');
        $scope.openChangeWallsModal();
    };
    
    $scope.slotThreeClick = function(){
        $scope.msg = 'changing portals';
        console.log('changing portals');
        $scope.openChangePortalsModal();
    };
    
    $scope.slotFourClick = function(){
        $scope.msg = 'slot 4 click';
        console.log('slot 4 click');
    };
    
//////////////////////////// PROFILE PIC UPLOAD
    
    $scope.myProfileImgId = 'http://vraptweb.xyz/default-user.jpg';
    
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('profileFiles', function() {
    //        console.log('profileFiles changed');
    $scope.profileUploadFiles = function(profileFiles){
      $scope.msg = 'uploading profile image';
      $scope.profileFiles = profileFiles;
      if (!$scope.profileFiles) return;
      angular.forEach(profileFiles, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              context: 'photo=' + $scope.title,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            data.context = {custom: {photo: $scope.title}};
            file.result = data;

              //after image uploads
    //              console.log(data.secure_url);
    //              console.log(file);

              //save in firebase
              var fbProfilePicRef = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/profilepic');
              var fbProfilePic = new $firebaseObject(fbProfilePicRef);

              fbProfilePic.$value = data.secure_url;
              fbProfilePic.$save();

              //set myProfileImgId to cloudinary url
              $('#myProfileImgId').attr('src', data.secure_url)
              
              $scope.msg = 'profile pic changed';

          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    
//////////////////////////// BUILD TOWER
    
    // get apt count from firebase
    var aptCountRef = new Firebase(FIREBASE_URL + 'stats').child('aptcount');
    var aptCount = $firebaseObject(aptCountRef);
    
    // get apt info for bld 1
    var bldRef = new Firebase(FIREBASE_URL + 'bld');
    var bld = $firebaseArray(bldRef);
    
// Wrap the example in a timeout so it doesn't get executed when Angular
// is first started.
setTimeout(function() {

    // document ready
    angular.element(document).ready(function(){
        
        // when firebase data is loaded
        bld.$loaded().then(function(){
        aptCount.$loaded().then(function(){
            
            //find my messages
//            var myMessages = bld[0].apt[$rootScope.currentUser.aptnum-1].messages;
            
            var myMessagesRef = new Firebase(FIREBASE_URL + 'bld/' +$rootScope.currentUser.bldnum + '/apt/' +($rootScope.currentUser.aptnum-1) + '/messages');
            
            $scope.myMessages = $firebaseArray(myMessagesRef);
            
            var query = myMessagesRef.orderByChild('sendTime').limitToLast(3);
            
            $scope.filteredMessages = $firebaseArray(query);
            

            
            // for 3d css
            var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
            prop,
            el = document.createElement('div');
            for(var i = 0, l = props.length; i < l; i++) {
                if(typeof el.style[props[i]] !== "undefined") {
                    prop = props[i];
                    break;
            }}

            // number of floors equal to number of apts
            var floorCount = aptCount.$value;
            
//            console.log($rootScope.currentUser.$id);


            //append floors to dom
            for(i=0;i<floorCount;i++){
                
                //if my floor
                if( bld[0].apt[i].owner === $rootScope.currentUser.$id ){
                    console.log('rendering my floor');
                    
                    
                    //custom floor
                      var $div = $('<div id="cube' +i +'" class="cube"> <div class="cap one" id="top' +i +'">Top</div><div class="side two" id="front' +i +'"> <div class="userPortrait"><img id="myProfileImgId" ng-src="' +bld[0].apt[i].profilepic +'" alt="default user image" class="userImg"></div><div class="status-info-container"> <div class="status-bar"> <p class="userNumber">apt#' +bld[0].apt[i].aptnum +'</p><p class="userName">' +bld[0].apt[i].ownerfname +' ' +bld[0].apt[i].ownerlname +'</p><p id="myUserStatus" class="userStatus">status: ' +bld[0].apt[i].status +'</p></div><div class="info-area"> <div class="info-area-slot"> <div id="profile_upload" class="profile-pic-drop-area" ngf-drop="profileUploadFiles($files)" ngf-drag-over-class="dragOverClass($event)" ng-model="profileFiles" ng-multiple="false"> <div href="#" class="profile-pic-drop-target" ngf-select="profileUploadFiles($files)" title="upload" resetOnClick="true"></div></div></div><div class="info-area-slot"><button class="info-area-slot2" ng-click="slotTwoClick()"></button></div><div class="info-area-slot"><button class="info-area-slot3" ng-click="slotThreeClick()"></button></div><div class="info-area-slot"><button class="info-area-slot4" ng-click="slotFourClick()"></button></div></div></div></div><div class="side three" id="right' +i +'"> <div class="infoIconContainer"><img src="http://vraptweb.xyz/info-icon.png" alt="click for more information" class="infoIcon"></div></div><div class="side four" id="back' +i +'"> <div class="my-cube-back"> <p class="my-status-label">Status:</p><input class="my-status-input" type="text" ng-model="myUserStatus"/><button class="my-status-set" ng-click="setMyStatus()">Set</button> <p class="my-messages-label">MESSAGES</h1> <div class="my-message-cont my-message-cont-{{$index}}" ng-repeat="message in filteredMessages"> <p class="my-message">{{message.sender.firstname}}{{message.sender.lastname}}-{{message.body}}</p><button class="delete" ng-click="filteredMessages.$remove(message)">DELETE</button> <button class="read" ng-click="openMessageModal()">READ</button> </div></div></div><div class="side five" id="left' +i +'"> <div class="returnIconContainer"><img src="http://vraptweb.xyz/return-icon.png" alt="return to front" class="returnIcon"></div></div><div class="cap six" id="bottom' +i +'"></div></div>');

                      // The parent of the new element
                      var $target = $("#floorContainer");

                      angular.element($target).injector().invoke(function($compile) {
                        var $scope = angular.element($target).scope();
                        $target.prepend($compile($div)($scope));
                        // Finally, refresh the watch expressions in the new element
//                        $scope.$apply();
                      });
                
                //if someone elses floor
                } else {
                    console.log('rendering others floor');
                    //render regular floor
                    
                    //regular floor
                      var $div = $('<div id="cube' +i +'" class="cube"> <div class="cap one" id="top' +i +'">Top</div><div class="side two" id="front' +i +'"> <div class="userPortrait"><img src="' +bld[0].apt[i].profilepic +'" alt="default user image" class="userImg"></div><div class="status-info-container"> <div class="status-bar"> <p class="userNumber">apt#' +bld[0].apt[i].aptnum +'</p><p class="userName">' +bld[0].apt[i].ownerfname +' ' +bld[0].apt[i].ownerlname +'</p><p class="userStatus">status: ' +bld[0].apt[i].status +'</p></div><div class="info-area"></div></div></div><div class="side three" id="right' +i +'"> <div class="infoIconContainer"><img src="http://vraptweb.xyz/info-icon.png" alt="click for more information" class="infoIcon"></div></div><div class="side four" id="back' +i +'"> <div class="other-cube-back"> <div class="other-send-container"> <p class="other-status-label">Send Message:</p><input ng-model="sendMessageBody[' +i +']" class="other-status-input" type="text"/><button ng-click="sendMessageTo(0,' +bld[0].apt[i].aptnum +')" class="other-status-send">Send</button></div><div class="other-send-message"> <p>{{$scope.otherSendMessage}}</p></div></div></div><div class="side five" id="left' +i +'"> <div class="returnIconContainer"><img src="http://vraptweb.xyz/return-icon.png" alt="return to front" class="returnIcon"></div></div><div class="cap six" id="bottom' +i +'"></div></div>');

                      // The parent of the new element
                      var $target = $("#floorContainer");

                      angular.element($target).injector().invoke(function($compile) {
                        var $scope = angular.element($target).scope();
                        $target.prepend($compile($div)($scope));
                        // Finally, refresh the watch expressions in the new element
//                        $scope.$apply();
                      });
                }
                

                
                
            };

            //create click-to-rotate for floors
            for(i=0;i<floorCount;i++){
//                console.log('creating controls');
                var rightWall = 'right' +i,
                    leftWall = 'left' +i,
                    thisCube = 'cube' +i;
//                console.log(rightWall);
//                console.log(leftWall);
//                console.log(thisCube);
                createRightWallClick(rightWall, thisCube);
                createLeftWallClick(leftWall, thisCube);
        //        createPortalCopy(i);
            };



            function createRightWallClick(rightWall, thisCube){
//                console.log('creating right wall click controls');
                $("#" + rightWall).click( function(){
//                    console.log('right wall clicked');
                    document.getElementById(thisCube).style[prop] = "rotateX(0deg) rotateY(-180deg)";
                });
            };

            function createLeftWallClick(leftWall, thisCube){
//                console.log('creating left wall click controls');
                $("#" + leftWall).click( function(){
//                    console.log('left wall clicked');
                    document.getElementById(thisCube).style[prop] = "rotateX(0deg) rotateY(0deg)";
                }); 
            };
        }); //firebase data available
        }); //firebase data available
    }); //document ready
        
}, 100);
        
}]); //controller
