/// <reference path="components/base-controller.ts" />
/// <reference path="../lib/nAnts/stochastics.d.ts" />

module stochApp {
    'use strict';
    /** This is a simulation of a particle moving in a one-dimensional double well
     * the brownian motion is applied only to the velocity term
     */
    export class MyCtrl extends SimCtrl {
        /*** The rest can be changed to suit the problem at hand ***/

        title = "Double potential well problem";
        description = "This is a simulation of the system \\[\\ddot{x} = -U(x) -\\lambda \\dot{x} + \\eta\\] where \\(U\\) is" +
            " the potential function given by \\[U(x) = \\frac{1}{4} x^4 - \\frac{1}{2} x^2 . \\]"
        ;

        /* plot settings */
        trailConfig = {
            xDomain: [0,50],
            yDomain: [-2,2],
        };
        phaseConfig = {
            xDomain: [-2,2],
            yDomain: [-2,2],
        };

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
            {name: 'Potential strength', default: 1.0},
            {name: 'Damping', default: .1},
        ];
        stochParams = [
            {name: 'brownian motion effect', default: 0.1},
        ];
        dims = ['\\(x\\)', '\\(\\dot{x}\\)'];

        /** System dynamics (non-stochastic) 
         */
        A(x, t, c) {
            return [ x[1], 
                     c[0] * (x[0]-x[0]*x[0]*x[0]) - c[1]*x[1]];
        }
        /** System dynamics (stochastic) 
         */
        D(x, t, c) {
            return [ 0, 
                     c[0]];
        }

        updateData(sol: stochastics.Solution) {
            this.$scope.trailData = sol.getTrail(0);
            this.$scope.velData = sol.getTrail(1);
            this.$scope.trailConfig.xDomain = [0, this.$scope.params.tfinal];
            this.$scope.phaseData = sol.getPhase(0,1);
        }
        constructor($scope) { super($scope); this.setUpConfig();
            /* Custom functions and behaviour can go here */
            $scope.trailConfig = this.trailConfig;
            $scope.phaseConfig = this.phaseConfig;
        }
    }
}
