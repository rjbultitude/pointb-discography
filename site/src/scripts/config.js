require.config({
    paths: {
        jquery: '/src/scripts/libs/jquery',
        debug: '/src/scripts/modules/debug',
        base: '/src/scripts/base',
        d3: '/src/scripts/libs/d3',
        loadData: '/src/scripts/modules/load-data',
        structureData: '/src/scripts/modules/structure-data',
        createDrawGraph: '/src/scripts/modules/draw-graph'
    },
    shim: {
        d3: {
            exports: 'd3'
        }
    }

});

// Start the main app logic.
require(['jquery', 'debug', 'base', 'loadData'],
    function($, debug, base, loadDataModule) {
        'use strict';

        base.init();
        loadDataModule.init();
    }
);