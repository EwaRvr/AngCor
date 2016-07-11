(function () {
    'use strict';
    angular.module("angCor.controllers").controller('basicCtrl', ['$timeout', '$rootScope', '$cordovaBatteryStatus', '$cordovaToast', basicCtrl]);


    function basicCtrl($timeout, $rootScope, $cordovaBatteryStatus, $cordovaToast) {
        var that = this;
        that.log = [];
        that.beacons = {};
        that.beaconsRead = 0;
        that.batterylevel = 0;
        that.isPluggedIn = false;

        var i = 0;
        var Log = function (text) {
            console.log(text);
            i++;
            that.log.push(i + "-" + text);
        }

        document.addEventListener("deviceready", function () {
            $timeout(function () {
                Log(new Date());
                Log("Device Ready");
            });

            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            $rootScope.$on('$cordovaBatteryStatus:status', function(scope,status) {
                    onBatteryStatusUpdate(status, '');
            });
            $rootScope.$on('$cordovaBatteryStatus:low', function (scope, status) {
                onBatteryStatusLow(status);
            });
            $rootScope.$on('$cordovaBatteryStatus:critical', function (scope, status) {
                onBatteryStatusCritical(status);
            });

        }, false);

        function onPause() {
            Log('Pausing');
        }

        function onResume() {
            Log('Resuming');
        }

        function onBatteryStatusUpdate(result, state) {
            Log('Battery Level ' + state + ":" + result.level + (result.isPlugged?'% ⚡':'%'));
            that.batteryLevel = result.level;       // (0 - 100)
            that.isPluggedIn = result.isPlugged;   // bool
        }
        function onBatteryStatusLow(status) {
            $cordovaToast.showShortTop('WARNING! Your battery level is Low.');
            onBatteryStatusUpdate(status, 'Low ');
        }
        function onBatteryStatusCritical(status) {
            $cordovaToast.showLongTop('WARNING! Your battery level is at critical levels. Plug in NOW!');
            onBatteryStatusUpdate(status, 'Critical ');
        }
    }

})();