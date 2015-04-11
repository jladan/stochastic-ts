// TODO make these into the correct requirements
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../lib/nAnts/stochastics.d.ts" />


module stochApp {
    'use strict';
    export interface MethodParameterList {
        initial?: number[];
        sigma?: number;
        correlation?: number;
        tfinal?: number;
        dt?: number;
        pA?: number[];
        pD?: number[];
        method?: stochastics.Method;
    }
    export interface Parameter {
        name: string;
        default?: number;
    }
    interface IPScope extends ng.IScope {
        dimensions: string[];               // names of each dimension
        vs: MethodParameterList;            // method values
        detps: Parameter[];                 // deterministic parameters
        stochps: Parameter[];               // stochastic parameters
        methods: any[];
    }
    class ParameterCtrl {
        constructor ($scope: IPScope) {

            // default data
            $scope.vs.initial =     $scope.vs.initial || [];
            $scope.vs.sigma =       $scope.vs.sigma || 1;
            $scope.vs.correlation = $scope.vs.correlation || 0.1;
            $scope.vs.tfinal =      $scope.vs.tfinal || 50;
            $scope.vs.dt =          $scope.vs.dt || .01;
            $scope.vs.pA = [];
            for (var i in $scope.detps)
                $scope.vs.pA.push($scope.detps[i].default || 0);
            $scope.vs.pD = [];
            for (var i in $scope.stochps)
                $scope.vs.pD.push($scope.stochps[i].default || 0);

            // Methods
            $scope.methods = [
                {label: 'Euler-Maruyama', value: 1},
                {label: 'Milstein', value: 2},
                {label: 'Coloured', value: 3},
            ];
            $scope.vs.method = $scope.methods[0];
        }
    }

    export function parameterDirective () {
        return {
            restrict: 'EA',
            scope: {
                vs: '=',
                detps: '=',
                stochps: '=',
                dimensions: '=',
            },
            controller: ParameterCtrl,
            template:
`<fieldset>
    <legend>Non-Stochastic Parameters</legend>
    <p ng-repeat="p in detps">
        <input id="pA-{{$index}}" type="number" ng-model="vs.pA[$index]" />
        <label for="pA-{{$index}}">{{ p.name }}</label>
    </p>
</fieldset>
<fieldset>
    <legend>Stochastic Parameters</legend>
    <p ng-repeat="p in stochps">
        <input id="pD-{{$index}}" type="number" ng-model="vs.pD[$index]" />
        <label for="pD-{{$index}}">{{ p.name }}</label>
    </p>
</fieldset>
<fieldset>
    <legend>Numerical Scheme</legend>
    <p>
        <select id="sim-select" ng-model="vs.method"
            ng-options="m as m.label for m in methods track by m.value">
        </select>
        <label for="sim-select">Simulation Method</label>
    </p>
    <p ng-show="vs.method.value === 3">
        <input id="time-correlation" type="number" ng-model="vs.correlation" />
        <label for="time-correlation">Time correlation</label>
    </p>
    <p>
        <input id="dt" type="number" ng-model="vs.dt" />
        <label for="dt">Time-step</label>
    </p>
    <p>
        <input id="t-final" type="number" ng-model="vs.tfinal" />
        <label for="t-final">Final Time</label>
    </p>
    <p ng-repeat="d in dimensions">
        <input id="init-{{$index}}" type="number" ng-model="vs.initial[$index]" />
        <label for="init-{{$index}}">Initial {{d}}</label>
    </p>
</fieldset>`,
        }
    }
}
