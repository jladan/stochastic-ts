/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="./double-well-ctrl.ts" />
/// <reference path="./components/parameters.ts" />
/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */

// XXX Note: there will be errors if MathJax isn't already loaded.
declare var MathJax: any;
module stochApp {
'use strict';

    /* This is a directive from http://lucasbardella.com/blog/2014/11/katex-angularjs
     * modified so that it works with ngBind inside the tags.
     */
    function latexDirective() {
        return {
            restrict: 'AE',
            link: function (scope, element) {
                var newDom = element.clone();
                element.replaceWith(newDom);
                var pre = "\\(", post = "\\)";
                if (element[0].tagName === 'DIV') {
                    pre = "\\["; 
                    post = "\\]";
                }
                scope.$watch(function () {return element.html();}, function () {
                    console.log(element);
                    newDom.html(pre + element.html() + post);
                    MathJax.Hub.Typeset(newDom[0]);
                });
            }
        }
    }

    angular.module('app', [
        'ngGraphs',
    ])
    .controller('simCtrl', MyCtrl)
    .directive('parameters', parameterDirective)
    .directive('latex', latexDirective)
    ;

}

