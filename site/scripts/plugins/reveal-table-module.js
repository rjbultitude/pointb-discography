/*
+------------------------------------------------------------------------------+
|                                              
|  Jquery Plugin: $reveal-table 1.00
|
|  File Written By:                                  
|  - Richard Bultitude
|  - http://www.thisiszone.com
|  
|  //Takes specific number of tables rows and hides them
|  //Button reveals/hides rows on click
|                                                
+------------------------------------------------------------------------------+
*/

define(['jquery', 'globals'], function($, globals){
    'use strict';

    (function ($) {

        $.fn.revealTable = function () {

            return this.each(function () {

                var $wrapper = $(this);
                var $table = $wrapper.find('table');
                var $tableCutOff = $table.find('tr:gt(6)');
                var $showButtonText = 'Show more';
                var $hideButtonText = 'Hide';
                var $moreButton = $('<a href="#" class="more">' + $showButtonText + '</a>');

                hideRows();
                addTableButton();
                reveal();

                function hideRows() {
                    $tableCutOff.hide();
                    $table.addClass('closed');
                }
                
                function addTableButton() {
                    $($moreButton).insertAfter($table);
                }

                function reveal() {

                    $moreButton.on('click', function(e){
                        e.preventDefault();
                        if ($table.hasClass('closed')) {
                                $tableCutOff.show();
                                $table.removeClass('closed').addClass('open');
                                $(this).text($hideButtonText);
                            }
                        else if ($table.hasClass('open')) {
                            $tableCutOff.hide();
                            $table.removeClass('open').addClass('closed');
                            $(this).text($showButtonText);
                        }
                     
                    });
                }

                //return revealTableModule;

            }); //end each
        } //end jquery extend

    })(jQuery);


}); //end define