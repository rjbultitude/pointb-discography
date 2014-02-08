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

        shadeColor: function(color, percent) {

            var R = parseInt(color.substring(1, 3), 16);
            var G = parseInt(color.substring(3, 5), 16);
            var B = parseInt(color.substring(5, 7), 16);

            R = parseInt(R * (100 + percent) / 100, 16);
            G = parseInt(G * (100 + percent) / 100, 16);
            B = parseInt(B * (100 + percent) / 100, 16);

            R = (R < 255) ? R : 255;
            G = (G < 255) ? G : 255;
            B = (B < 255) ? B : 255;

            var rStr = (R.toString(16).length < 2) ? '0' + R.toString(16) : R.toString(16);
            var gStr = (G.toString(16).length < 2) ? '0' + G.toString(16) : G.toString(16);
            var bStr = (B.toString(16).length < 2) ? '0' + B.toString(16) : B.toString(16);

            return ('#') + rStr + gStr + bStr;
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