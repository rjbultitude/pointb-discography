//base functions

define(['jquery'], function($) {
    'use strict';

    var base = {

        debug: false,
        ltIe9: $('html.lt-ie9').size(),
        animationSpeed: 1000,
        animationEasing: 'easeOutCirc',

        init: function() {
            this.outerhtmlFallback();
            this.loadHtmlSnippets();
            this.disableControlsHref();
        },

        outerhtmlFallback: function outerhtmlFallbackFn() {
            $.fn.outerHTML = function() {

                // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
                return (!this.length) ? this : (this[0].outerHTML || (
                    function(el) {
                        var div = document.createElement('div');
                        div.appendChild(el.cloneNode(true));
                        var contents = div.innerHTML;
                        div = null;
                        return contents;
                    })(this[0]));
            };
        },

        /* Load HTML snippets */
        loadHtmlSnippets: function loadHtmlSnippetsFn() {
            $.ajax({
                url: base.htmlSnippetsURL,
                datatype: 'text/html',
                async: false,
                success: function(data) {
                    base.htmlSnippets = $(data);
                }
            });
        },

        disableControlsHref: function disableControlsHrefFn() {
            $('a[rel="prev"], a[rel="next"]').on('click', function(e) {
                e.preventDefault();
            });
        },

        colorLuminance: function (hex, lum) {

            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            lum = lum || 0;

            // convert to decimal and change luminosity
            var rgb = '#',
                c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ('00' + c).substr(c.length);
            }

            return rgb;
        }

    }; //end base

    //IE selectivizr polyfill
    $(function() {
        if (base.ltIe9) {
            require(['jquery']);
        }
    });

    return base;
});