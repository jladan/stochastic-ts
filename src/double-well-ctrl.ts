/// <reference path="components/base-controller.ts" />
/// <reference path="../lib/nAnts/stochastics.d.ts" />


module stochApp {
    'use strict';
    /** This is a simulation of a particle moving in a one-dimensional double well
     * the brownian motion is applied only to the velocity term
     */
    export class MyCtrl extends SimCtrl {
        /*** The rest can be changed to suit the problem at hand ***/
        
        // default parameters
        params = {
            initial: [0.5, 0],
            /*
            sigma: 1,
            correlation: 0.01,
            tfinal: 40,
            dt: .01,
            /* */
        };
        // System parameters
        detParams = [
            {name: 'Potential quartic', default: 1.0},
            {name: 'Potential quadratic', default: 1.0},
            {name: 'Potential shift', default: 0.0},
            {name: 'Damping', default: .1},
        ];
        stochParams = [
            {name: 'brownian motion effect', default: 0.1},
        ];
        dims = ['\\(x\\)', '\\(\\dot{x}\\)'];

        /** System dynamics (non-stochastic) 
         */
        A(x : number[], t : number[], c : number []) {
            return [ x[1], 
                     (c[1]*(x[0]-c[2])-c[0]*x[0]*x[0]*x[0]) - c[3]*x[1]];
        }
        /** System dynamics (stochastic) 
         */
        D(x : number[], t : number[], c : number[]) {
            return [ 0, 
                     c[0]];
        }

        updateData(sol: stochastics.Solution) {
            // XXX It's hard-set to 1000 samples here. This downsampling can
            // cause aliasing issues for longer runs
            var outStep = Math.ceil(this.$scope.params.tfinal / (this.$scope.params.dt * 1000));
            console.log(outStep, this.$scope.params.tfinal / this.$scope.params.dt);
            this.$scope.trailData = sol.getTrail(0, outStep);
            this.$scope.velData = sol.getTrail(1, outStep);
            this.$scope.trailConfig.xDomain = [0, this.$scope.params.tfinal];
            this.$scope.phaseData = sol.getPhase(0,1, outStep);

            this.$scope.histData = 4;// ...
        }
        constructor($scope) { super($scope); this.setUpConfig();
            /* Custom functions and behaviour can go here */
            /* plot settings */
            $scope.trailConfig = {
                xDomain: [0,50],
                yDomain: [-2,2],
            };
            $scope.phaseConfig = {
                xDomain: [-2,2],
                yDomain: [-2,2],
            };
            $scope.potentialConfig = {
                xDomain: [-2,2],
                yDomain: [-0.5,2]
            };

            // XXX The potentialFunction needs to be defined early for the child plot, because that isn't handled gracefully yet
            $scope.potentialFunction = function (x) { return $scope.params.pA[0]*Math.pow(x, 4)/4 - $scope.params.pA[1]*Math.pow(x-$scope.params.pA[2], 2)/2; };
            $scope.$watch('params.pA', function (n, o) {
                // Update the potential function with new parameters.
                // It's also possible to change the domain in the axes here,
                // but I will be adding auto-scaling soon.
                $scope.potentialFunction = function (x) { return n[0]*Math.pow(x, 4)/4 - n[1]*Math.pow(x-n[2], 2)/2; };
            }, true);
        }
    }
}
