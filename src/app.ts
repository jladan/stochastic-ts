/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="./double-well-ctrl.ts" />
/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */

module stochApp {
'use strict';

    angular.module('app', [
        'plotModule',
    ])
    .controller('simCtrl', SimCtrl)
    ;

}

