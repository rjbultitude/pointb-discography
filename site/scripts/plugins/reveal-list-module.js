/*
+------------------------------------------------------------------------------+
|                                              
|  Jquery Plugin: $reveal-list 1.00
|
|  File Written By:                                  
|  - Richard Bultitude
|  - http://www.thisiszone.com
|  
|  //Takes chosen number of list items from the end of a list
|  //creates a new list from them and hides the list
|  //Button reveals/hides the new list on click
|  //Button text can be set on init
|  //Number of initial list items displayed can be set on init
|                                                
+------------------------------------------------------------------------------+
*/



define(['jquery', 'globals','eventTracker'], function($, globals, eventTracker){
    'use strict';

    (function ($) {

        $.fn.revealList = function(options) {

            //Settings
            var settings = $.extend({
                showButtonTxt       : null,
                initialItems        : 2
            }, options);

            //act on each item with this selector
            return this.each(function () {

                //Variables
                var $wrapper        = $(this);
                var $showButtonText = globals.htmlSnippets.find('#show-more-text').text();
                var $hideButtonText = globals.htmlSnippets.find('#hide-more-text').text();
                var $moreButton     = $('<a href="#" class="more">' + settings.showButtonTxt + '</a>');
                var $list           = $wrapper.find('ul');
                var $listClasses    = $list.attr('class');
                var $listCutOff     = $list.find('li:gt(' + settings.initialItems + ')');
                var $newListWrapper;
                var $newList;


                //Inits
                setButtonText();
                createNewList();
                addButton();
                reveal();


                //Functions
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

                function createNewList() {
                    $newList = $listCutOff.clone();
                    $listCutOff.remove();

                    //Call hide after clone
                    hideItems();
                }

                function hideItems() {
                    $newListWrapper = $newList.insertAfter($list).wrapAll('<ul></ul>').parent();
                    $newListWrapper.addClass($listClasses).addClass('cut-off-wrapper').hide();
                    $wrapper.addClass('closed');
                }
                
                function addButton() {
                    $($moreButton).appendTo($wrapper);
                }

                function reveal() {

                    $moreButton.on('click', function(e){
                        e.preventDefault();
                        if ($wrapper.hasClass('closed')) {
                            $newListWrapper.slideDown(globals.animationSpeed, globals.animationEasing, function(){
                                $wrapper.removeClass('closed').addClass('open');
                            });
                            $(this).text($hideButtonText);
                            eventTracker.trackEvent('Opened ' + settings.showButtonTxt);
                        } 

                        else if ($wrapper.hasClass('open')) {
                            $newListWrapper.slideUp(globals.animationSpeed, globals.animationEasing, function(){
                                $wrapper.removeClass('open').addClass('closed');
                            });
                            $(this).text($showButtonText);
                            eventTracker.trackEvent('Closed ' + settings.showButtonTxt);
                        }
                     
                    });
                }

                //return revealTableModule;

            }); //end each
        } //end jquery extend

    })(jQuery);


}); //end define