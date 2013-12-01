define(['globals', 'base'], function(globals) {
    'use strict';

    var testmodule = {


        init: function initFn() {

            this.firstFunction();

        },

        /*
         *   firstFunction // example
         *   ---------------------------------------------
         *   Show in console that script is running correctly
         *   with specific console styling
         *   ---------------------------------------------
         *   @param n/a
         *   @return Void
         */

        firstFunction: function firstFunctionFn() {

            console.log('%cWelcome to the Zone Front End Boilerplate', globals.logstyleInfo);

        }

    };

    return testmodule;
});