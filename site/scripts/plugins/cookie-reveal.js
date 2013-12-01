//Slide up or down the selected element dependig on it's current state

define(['jquery', 'globals'], function($, globals){
    'use strict';

    (function ($) {

        $.fn.cookieReveal = function () {

            return this.each(function () {

                var $container = $(this);
                var $content = $container.find('.body-content');
                var $trigger = $container.find('.reveal-button');
                var $html_snippet = undefined;
                var $html_cookies_container = undefined;
                var start = undefined;
                var end = undefined;
                var initial_status = 'open';
                if ($container.data('status') === 'closed') {
                    initial_status = 'closed';
                }

                $( document ).ready(function() {
                    check();
                    revealButton();
                });

                function check(){
                    if(get('cookie_status') === "") {
                        console.log("open");
                        $content.slideDown(globals.animationSpeed, globals.animationEasing, function() {
                            $container.removeClass('closed').addClass('open');
                        });
                        accept();
                        return true;
                    }    

                    //if cookie is set
                    else{
                        $container.removeClass('open').addClass('closed');
                        console.log($container);
                     }

                }

                /*
                 *   Updates the cookie by re-setting it (or initially setting it)
                 *   @param policy: String of policy data as 3 boolean characters (ie: 111, 000, 010)
                 *   @return Boolean: True if cookie successfully set, false otherwise
                 */
                function revealButton() {
                    $($trigger).on('click', function(e) {
                        console.log("im clicked");  
                        e.preventDefault();
                        if ($container.hasClass('open')) {
                            $content.slideUp(globals.animationSpeed, globals.animationEasing, function(){
                                $container.removeClass('open').addClass('closed');
                            });
                        }
                        else if ($container.hasClass('closed')) {
                            $content.slideDown(globals.animationSpeed, globals.animationEasing, function(){
                                $container.removeClass('closed').addClass('open');
                            });
                        }
                    });

                }

                function accept(e) {

                    var cookie_options = {
                        name: 'cookie_status',
                        value: true,
                        hours: '0.5'
                    };

                    if (set(cookie_options)) {
                        return true;
                    }
                
                    return false;
                }

                function loadHTMLSnippets(f) {
                 "use strict";

                        if (globals.htmlSnippetsURL === undefined) {

                        $.ajax({
                            url: globals.htmlSnippetsURL,
                            datatype: 'text/html',
                            async: false,
                            success: function (data) {

                                globals.htmlSnippetsURL = data;

                                if (typeof f === 'function') {
                                    f(data);
                                }
                            }
                        });

                          } else {

                        if (typeof f === 'function') {
                            f(CONSTANTS.HTML_SNIPPETS);
                        }
                    }
                }

                
                function get(name) {

                    if (name) {
                        if (document.cookie.length > 0) {
                            start = document.cookie.indexOf(name + "=");
                            if (start !== -1) {
                                start = start + name.length + 1;
                                end = document.cookie.indexOf(";", start);
                                if (end === -1) {
                                    end = document.cookie.length;
                                }
                                return unescape(document.cookie.substring(start, end));
                            }
                        }
                        return "";
                    } else {
                        $.error('Cookie name undefined');
                    }

                }

                function set(options) { 

                    var settings = {
                        name : undefined,
                        value : 1,
                        hours : 1
                    };

                    if (options) { 
                        $.extend(settings, options);
                    }
                    
                    if (settings.name) {
                        var today = new Date();
                        var expire = new Date();
                        if (settings.hours === null || settings.hours === 0) {
                            settings.hours = 1;
                        }
                        expire.setTime(today.getTime() + 3600000 * settings.hours);
                        document.cookie = settings.name + "=" + escape(settings.value) + ";expires=" + expire.toGMTString() + ";path=/";
                    } else {
                        $.error('Cookie name undefined');
                        return false;
                    }

                    return true;
                }//end set

            });//end each

        }//end cookies

    })(jQuery);

}); //end define