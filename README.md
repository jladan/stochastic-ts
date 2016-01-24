# Stochastic Demo

This is mainly a simple template for running a stochastic simulation demo. The entire demo can be changed by modifying src/app.ts and src/double-well-ctrl.js.

## Installation

To build the demo (compile the typescript), there are a few dev dependencies. First, install them with [npm](https://www.npmjs.com/)

    npm install

Next, the type declarations for the javascript libraries used on the site. Using `tsd`,

    tsd update

Finally, the demo itself has a few dependencies, notably [AngularJS](http://angularjs.org) and [D3](http://d3js.org), as well as our own libraries [nAnts](https://github.com/jladan/nAnts) (for calculations) and [ng-graphs](https://github.com/jladan/ng-graphs) (for plots). They can be installed using [Bower](http://bower.io) with the command

    bower install

The libraries installed with bower are the only ones needed for actual deployment.

## Compilation

The demo can be compiled by running the command

    tsc --out js/app.js src/app.js
    
or with

    tsc @fuildflags
    
After which, the page can be viewed by opening `index.html`.

## Customization

As of this writing, customization is done by creating a controller (based off `src/double-well-ctrl.js`), and changing the first line of `src/app.ts` to reference that file instead.

After changing the source files, the app will have to be re-compiled. This is done using the command

    tsc @buildflags

## Multiple demos

The `src/app.ts`, `src/double-well-ctrl.js`, and `index.html` files can be copied to make new demos. Simply change the reference at the top of `src/app.ts` to the new controller, and change the script tag in `index.html` to point to the new javascript app.

## Future plans

Using the same index for all models, and changing it based on content is good from a consistency point of view, but it would be nice to have more flexibility when different types of models demand different presentations.


## Notable files
All of the necessary angular modules are specified in `src/app.ts`. The main controller is in `src/double-well-ctrl.ts`. Components for use in any demo are located in `src/components/`.

