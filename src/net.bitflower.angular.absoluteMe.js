// Copyright (c) 2014 All Right Reserved, http://bitflower.net/
//
// </copyright>
// <author>Matthias Max</author>
// <email>touch@bitflower.net</email>
// <date>2014-09-11</date>
// <version>0.0.1</version>

"use strict";

(function () {

    var moduleName = 'net.bitflower.angular.dom';

    angular.module(moduleName, []);

    // bfAbsoluteMe directive

    // Parameters:
    // w:       true = set width to absolute value
    // h:       true = set height to absolute value
    // delay:   number = milliseconds after which the absolute sizes are applied
    // initial: false = don't turn sizes into absolute on first load

    angular.module(moduleName).directive('bfAbsoluteMe', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                // timer that is going to be cancel while resizing
                var timer;
                var time = 500;
                if (attrs.delay != undefined && attrs.delay != '') {
                    time = parseInt(attrs.delay);
                }

                var initial = true;
                if (attrs.initial != undefined && attrs.initial == 'false') {
                    initial = false;
                }

                // While resizing: let the grid system (Bootstrap, Foundation, etc ...) layout the control
                // Width 
                if (attrs.w != undefined && attrs.w != '') {
                    element[0].style.width = '';
                }
                if (attrs.h != undefined && attrs.h != '') {
                    element[0].style.height = '';
                }

                function resize() {

                    // Width 
                    if (attrs.w != undefined && attrs.w != '') {
                        element[0].style.width = element[0].offsetWidth + 'px';
                    }
                    // Height 
                    if (attrs.h != undefined && attrs.h != '') {
                        element[0].style.height = element[0].offsetHeight + 'px';
                    }
                }

                var w = angular.element($window);
                w.bind('resize', function () {

                    element[0].style.width = '';
                    element[0].style.height = '';

                    clearTimeout(timer);
                    timer = setTimeout(resize, time);
                });

                if (initial) {
                    resize();
                }

            }
        };
    });

})();