/*
+------------------------------------------------------------------------------+
|                                              
|  Jquery Plugin: $reveal-div 1.00
|
|  File Written By:                                  
|  - Richard Bultitude
|  - http://www.thisiszone.com
|  
|  //Reveals contents of wrapper
|  //Text for the open button can be set on init
|  //Reveal attempts to use css for the transition
|  //& falls back to JS
|                                                
+------------------------------------------------------------------------------+
*/


define(['jquery', 'globals', 'debug'], function($, globals, debug){
    'use strict';

    (function ($) {

        $.fn.revealDiv = function (options) {

            //Settings
            var settings = $.extend({
                showButtonTxt       : null
            }, options);

            return this.each(function () {

                var $wrapper = $(this);
                var $showButtonText = globals.htmlSnippets.find('#show-more-text').text();
                var $hideButtonText = globals.htmlSnippets.find('#hide-more-text').text();
                var $moreButton = $('<a href="#" class="more">' + $showButtonText + '</a>');
                var wrapperHeight = 1;

                setButtonText();
                hideItems();
                addButton();
                reveal();

                function setButtonText() {
                    //Show button
                    if (settings.showButtonTxt) {
                        $moreButton.text(settings.showButtonTxt);
                        $showButtonText = settings.showButtonTxt;
                    }
                    else {
                        $moreButton.text($showButtonText);
                    }
                }

                function hideItems() {
                    if (Modernizr.csstransitions) {
                        wrapperHeight = $wrapper.height();
                        $wrapper.css('height','0').addClass('closed-trans');
                    }
                    else {
                        $wrapper.hide().addClass('closed');
                    }
                }
                
                function addButton() {
                    $($moreButton).insertAfter($wrapper);
                }
                

                function reveal() {
                    $moreButton.on('click', function(e){
                        e.preventDefault();

                        if (Modernizr.csstransitions) {
                            if ($wrapper.hasClass('closed-trans')) {
                                $wrapper.removeClass('closed-trans').css('height', wrapperHeight).addClass('open-trans');
                                $(this).text($hideButtonText);
                            }
                            else if ($wrapper.hasClass('open-trans')) {
                                $wrapper.removeClass('open-trans').css('height', '0').addClass('closed-trans');
                                $(this).text($showButtonText);
                            }
                        }
                        else {
                            if ($wrapper.hasClass('closed')) {
                                $wrapper.slideDown(globals.animationSpeed, globals.animationEasing, function(){
                                    $wrapper.removeClass('closed').addClass('open');
                                });
                                $(this).text($hideButtonText);
                            } 

                            else if ($wrapper.hasClass('open')) {
                                $wrapper.slideUp(globals.animationSpeed, globals.animationEasing, function(){
                                    $wrapper.removeClass('open').addClass('closed');
                                });
                                $(this).text($showButtonText);
                            }
                        }

                    });//end on
                }//end reveal

                //return revealTableModule;

            }); //end each
        } //end jquery extend

    })(jQuery);


}); //end define