# Stochastic Demo

This is mainly a simple template for running a stochastic simulation demo. The entire demo can be changed by modifying src/app.ts and src/double-well-ctrl.js.

## Installation

The demo has a few dependencies, notably [AngularJS](http://angularjs.org) and [D3](http://d3js.org), as well as our own libraries [nAnts](https://github.com/jladan/nAnts) (for calculations) and [ng-graphs](https://github.com/jladan/ng-graphs) (for plots). They can be installed using [Bower](http://bower.io) with the command

    bower install

If missing, bower can be installed with 

    npm install -g bower

You may need sudo privileges to install bower globally. Finally, if [npm](https://www.npmjs.com/) is missing, you'll have to figure it out yourself, because it's different depending on platform.

## Customization

As of this writing, customization is done by creating a controller (based off `src/double-well-ctrl.js`), and changing the first line of `src/app.ts` to reference that file instead.

After changing the source files, the app will have to be re-compiled. This is done using the command

    tsc @buildflags

## Future plans

Using the same index for all models, and changing it based on content is good from a consistency point of view, but it would be nice to have more flexibility when different types of models demand different presentations.


## Notable files
All of the necessary angular modules are specified in `src/app.ts`. The main controller is in `src/double-well-ctrl.ts`. Components for use in any demo are located in `src/components/`.

