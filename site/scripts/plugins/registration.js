//registration page

//
// Just a proof of concept by Rich Davis
//

define(['jquery', 'eventTracker'],
    
function ($, eventTracker) {

    'use strict';

    var fullnameIsValid = false;
    var emailIsValid = false;
    var passwordIsValid = false;
   
    var setInitialFocus = function () {

        $('form:first *:input[type!=hidden]:first').focus();

        $('form:first *:input[type!=hidden]:first').siblings(".first").toggle();

    };

    var submitValidator = function(e) {

        e.preventDefault();

        //trigger validation again
        $(".fullname").trigger('blur');
        $(".password").trigger('blur');
        $(".email").trigger('blur');
        
        // check for the existence of any visible errors, and don't submit if so
        if (fullnameIsValid && emailIsValid && passwordIsValid) {
            $("#validation-summary").hide();
            $("form").submit();
        }
        else {
            $("#validation-summary").show();
        }
    }

    var fullNameValidator = function() {
        var input = $(this);
        input.siblings(".message:visible").toggle();
        if (input.val()) {
            input.siblings(".success").toggle();
            fullnameIsValid = true;
        } else {
            input.siblings(".first").toggle();
        }
    };

    var emailValidator = function() {
        var input = $(this);

        input.siblings(".message:visible").toggle();

        if (input.val()) {

            var email = input.val();

            // is it a valid email? -> server side check
            $.getJSON("/register/validateemail?email=" + email, function (data) {
                input.siblings(".message").hide();
                $.each(data, function (key, val) {

                    if (key == "Valid" && val == false) {
                        input.siblings(".invalid").toggle();
                        eventTracker.trackEvent('Invalid email entered');
                    }
                    
                    if (key == "Taken" && val == true) {
                        input.siblings(".taken").toggle();
                        eventTracker.trackEvent('Existing email entered');
                    }
                    
                    if (key == "Valid" && val == true) {
                        input.siblings(".success").toggle();
                        emailIsValid = true;
                        eventTracker.trackEvent('Valid email entered');
                    }
                });
            });

            input.siblings(".success").toggle();

        } else {
            input.siblings(".first").toggle();
        }
    }
    
    var passwordValidator = function () {
        var input = $(this);

        input.siblings(".message:visible").toggle();

        if (input.val()) {
            if (input.val().length > 5) {

                input.siblings(".message").hide();

                var passwordStrength = zxcvbn(input.val());

                console.log(passwordStrength);
               
                switch (passwordStrength.score) {
                    case 0:
                        input.siblings(".bad").toggle();
                        eventTracker.trackEvent('Weak password entered');
                        break;
                    case 1:
                    case 2:
                    case 3:
                        input.siblings(".ok").toggle();
                        passwordIsValid = true;
                        eventTracker.trackEvent('Acceptable password entered');
                        break;
                    default:
                        input.siblings(".success").toggle();
                        passwordIsValid = true;
                        eventTracker.trackEvent('Strong password entered');
                        break;
                }
            }
            else {
                input.siblings(".invalid").toggle();
                eventTracker.trackEvent('Invalid password entered');
            }
        }
        else {
            input.siblings(".first").toggle();
        }

    }

    var init = function() {

        setInitialFocus();
        
        $(".register-fullname").blur(fullNameValidator);
        
        $(".register-email").blur(emailValidator);
        $(".register-email").focus(emailValidator);

        $(".register-password").blur(passwordValidator);
        $(".register-password").focus(passwordValidator);

        $("button.register").click(submitValidator);

        
    // end init
    };
    

    var registration = {
        init: init,
    };

    return registration;
});