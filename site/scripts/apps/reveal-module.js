//Slide up or down the selected element dependig on it's current state

define(['jquery'], function($){
    'use strict';

    (function ($) {

        $.fn.revealModule = function () {

            return this.each(function () {

                var thisModule = $(this);

                function revealElement($button, $container) {
                    $button.on("click", function(e){
                        e.preventDefault();
                        if ($container.hasClass('closed')) {
                            $container.slideDown().removeClass('closed').addClass('open');
                            $button.children('.text').text('close');
                        }
                        else if ($container.hasClass('open')) {
                            $container.slideUp().removeClass('open').addClass('closed');
                            $button.children('.text').text('open');
                        }
                    }); //end on
                }//end revealElement

            }); //end each

        }//endrevealModule

    })(jQuery);
        
}); //end define