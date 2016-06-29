(function () {
    'use strict';
    angular.module("angCor.controllers").controller('basicCtrl', ['$timeout', basicCtrl]);


    function basicCtrl($timeout) {
        var that = this;
        that.log = [];
        that.beacons = {};
        that.beaconsRead = 0;

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

            document.addEventListener('pause', function () { onPause(); }, false);
            document.addEventListener('resume', function () { onResume(); }, false);
        }, false);

        function onPause() {
            Log('Pausing');
        }

        function onResume() {
            Log('Resuming');
        }

    }

})();