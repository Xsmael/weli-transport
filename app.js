

angular.module("transport", ['faye','ui.router', 'ui.toggle','ngBootbox',])

   .config( function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    controller: 'HomeController',
                    templateUrl: 'templates/home.html'
                })
                // .state('dash', {
                //     url: '/dash',
                //     controller: 'DashController',
                //     templateUrl: 'templates/dash.html'
                // })

                .state('users', {
                    url: '/users',
                    controller: "UserController",
                    templateUrl: 'templates/users.html'
                })
                .state('trip', {
                    url: '/trip',
                    controller: "TripController",
                    templateUrl: 'templates/trip.html'
                })
                .state('ticket', {
                    url: '/ticket',
                    controller: "TicketController",
                    templateUrl: 'templates/ticket.html'
                })
                .state('vehicle', {
                    url: '/vehicle',
                    controller: "VehicleController",
                    templateUrl: 'templates/vehicle.html'
                })
                .state('parcel', {
                    url: '/parcel',
                    controller: "ParcelController",
                    templateUrl: 'templates/parcel.html'
                })
                .state('settings', {
                    url: '/settings',
                    controller: "SettingsController",
                    templateUrl: 'templates/settings.html'
                })
            ;
            $urlRouterProvider.otherwise('/');

        })
        
        /*
        .config(function(NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 5000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'bottom'
            });
        })*/
        .filter('fromMap', function() {
            return function(input) {
                var out = {};
                input.forEach((v, k) => out[k] = v);
                return out;
            };
        })

    .factory('FayeFactory', function($faye, $rootScope) {
            return $faye("http://localhost:8888/");
    })
      
    .service('SoundNotif', function () {
        this.play= function(which) {
            var primary = new Audio('sounds/primary.mp3');
            var info = new Audio('sounds/info.mp3');
            var success = new Audio('sounds/success.mp3');
            var warning = new Audio('sounds/warning.mp3');
            var danger = new Audio('sounds/danger.mp3');
            switch (which) {
                case 'critical':
                critical.play();
                break;
                case 'warning':
                warning.play();
                break;
                case 'error':
                error.play();
                break;
                case 'success':
                success.play();
                break;
                
            }
        };
    })
    
.controller("HomeController", function() {

})
.controller("VehicleController",function($scope, $rootScope, FayeFactory){
    $scope.vehicles= [];

    $scope.dialogOptions= {
        scope: $scope
    }

    $scope.create= function(v) {
        FayeFactory.publish('/create/Vehicle', v);
        console.log("Creating...");    
    }
    $scope.update= function(v) {
        FayeFactory.publish('/update/Vehicle', v);        
    }
    $scope.delete= function(v) {
        FayeFactory.publish('/delete/Vehicle', v);        
        console.log("Deleting...");    
    }

    FayeFactory.subscribe('/list/Vehicle', function(objs) {
        $scope.vehicles= objs;
        console.info(objs);
    });
    
    FayeFactory.publish('/list-req/Vehicle', {});
    console.warn("VehicleController");

})

.controller("TicketController",function($scope, $rootScope, FayeFactory){
    $scope.tickets= [];

    $scope.dialogOptions= {
        scope: $scope
    }

    $scope.create= function(o) {
        FayeFactory.publish('/create/Ticket', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Ticket', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Ticket', o);        
    }

    FayeFactory.subscribe('/list/Ticket', function(objs) {
        $scope.tickets= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Ticket', {});
    console.warn("TicketController");
})

.controller("ParcelController",function($scope, $rootScope, FayeFactory){
    $scope.parcels= [];

    $scope.dialogOptions= {
        scope: $scope
    }

    $scope.create= function(o) {
        FayeFactory.publish('/create/Parcel', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Parcel', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Parcel', o);        
    }

    FayeFactory.subscribe('/list/Parcel', function(objs) {
        $scope.parcels= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Parcel', {});
    console.warn("ParcelController");
})

.controller("TripController",function($scope, $rootScope, FayeFactory){
    $scope.Trips= [];
    $scope.vehicles= [];

    $scope.dialogOptions= {
        scope: $scope
    }

    $scope.create= function(o) {
        FayeFactory.publish('/create/Trip', o); 
        console.log(o);   
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Trip', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Trip', o);        
    }

    FayeFactory.subscribe('/list/Trip', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.subscribe('/list/Vehicle', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    })
    
    FayeFactory.publish('/list-req/Trip', {});
    FayeFactory.publish('/list-req/Vehicle', {});
    console.warn("TripController");
})

.controller("SettingsController",function($scope, $rootScope){

})

;

/**
 * MISC
 * 
 */

function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
