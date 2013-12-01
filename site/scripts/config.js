require.config({
    paths: {
        'jquery': '/bower_components/jquery/jquery',
        'debug': '/scripts/plugins/debug',
        'selectivizr':  '/bower_components/selectivizr/selectivizr',
        'toxi':  '/bower_components/toxiclibsjs/lib/toxi',
        'modernizr':  '/scripts/modernizr-custom',
        'ietidy': '/scripts/ietidy',
        'requirejs': '/bower_components/requirejs/require',
        'revealDivModule': '/scripts/plugins/reveal-div-module',
        'easing': '/scripts/plugins-3rdparty/jquery.easing.1.3',
        'registration': '/scripts/plugins/registration'
    },
    'shim': {
        'selectivizr': ['jquery']
    }
});

// Start the main app logic.
require(['jquery', 'globals', 'ietidy', 'base', 'revealDivModule', 'easing', 'registration'], function ($, globals, ietidy, base) {
    'use strict';

    base.init();
    $('.reveal-div').revealDiv({showButtonTxt: 'Read full synopsis'});

});

//Start toxic logic
require(['toxi/geom/Vec2D', toxi/color/TColor], function(Vec2D, TColor){
    var myVector = new Vec2D(window.innerWidth,window.innerHeight).scaleSelf(0.5);
    var myColor = TColor.newRGB(128/255,64/255,32/255);
});