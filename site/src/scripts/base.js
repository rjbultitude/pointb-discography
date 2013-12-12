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
            $('a[rel="prev"], a[rel="next"]').on('click', function(e){
                e.preventDefault();
            });
        }

    };//end base

    //IE selectivizr polyfill
    $(function() {
        if (base.ltIe9) {
            require(['jquery']);
        }
    });

    return base;
});