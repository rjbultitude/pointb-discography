define(['jquery'], function ($) {
    'use strict';

    $(function() {
        if ($('html.lt-ie9').size()) {
            require(['jquery', 'selectivizr']);
        }
    });
});