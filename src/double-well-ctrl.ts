// TODO make these into the correct requirements
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../lib/nAnts/stochastics.d.ts" />


module stochApp {
    'use strict';
    export function SimCtrl($scope) {
        var dorbit = function (x,t,c) {
            return [ c[0] * x[1], 
                     c[0] * (x[0]-x[0]*x[0]*x[0])];
        };
        
        var dwell = function (x,t,c) {
            return [ c[0] * (x[0] - x[0]*x[0]*x[0]),
                     - c[0] * (x[1])];
        };

        var dconstant = function (x,t,c) {
            return [ c[0], 
                     c[0]];
        };

        /* plot settings */
        $scope.plotConfig = {
            xDomain: [-2,2],
            yDomain: [-2,2],
        };
        //dummy data
        $scope.plotData = [ [-4,-2], [-2,1], [0,-1], [2,2], [4,-2]];

        // default data
        $scope.params = {
            initial: [0.1, 0],
            /*
            sigma: 1,
            correlation: 0.01,
            tfinal: 40,
            dt: .01,
            /* */
        };
        $scope.detParams = [
            {name: 'Speed', } // default: 1.0},
        ];
        $scope.stochParams = [
            {name: 'brownian motion effect', } // default: 0.1},
        ];
        $scope.dims = ['X', 'Y'];


        /* Simulation runner */
        $scope.runSimulation = function () {
            var sol: stochastics.Solution;
            if ($scope.params.method.value === 1)
                sol = stochastics.euler(dorbit, dconstant, $scope.params.initial, $scope.params.dt, 
                        $scope.params.tfinal, $scope.params.pA, $scope.params.pD);
            else if ($scope.params.method.value === 2)
                sol = stochastics.euler(dorbit, dconstant, $scope.params.initial, $scope.params.dt, 
                        $scope.params.tfinal, $scope.params.pA, $scope.params.pD);
            else
                sol = stochastics.colour(dorbit, dconstant, $scope.params.sigma, $scope.params.correlation,
                        $scope.params.initial, $scope.params.dt, $scope.params.tfinal, $scope.params.pA, $scope.params.pD);
            $scope.plotData = sol.getPhase(0,1);
        };
    }
}
