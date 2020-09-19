////////////////////////////////////////////////////////////////////////////////
// 
// changePasswordView.js
//
// This file acts as an MVC controller for the changePassword view. I
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// An instance of ViewPseudoStateMachine for managing views.
let viewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let viewStates;

//An instance of a GA provided module that manages dev and production
// URLs for us.
let config;

// store - An object to which we can attach information at runtime, such as the
// authenticated user.
let store;

// The view to which we write error messages.
let statusViewMessageArea;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const oldPasswordTextField = $('#old-password');
const newPasswordTextField = $('#new-password');
const submitButton =  $('#change-password-view-form');
const returnButton = $('#change-password-view-return-btn');


// Invokes the web service that creates a user.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const createAccountHandler = async event => {

    event.preventDefault();

    const data =  {
        "passwords": {
          "old": oldPasswordTextField.val(),
          "new": newPasswordTextField.val()
        }
    }

    try {
        await $.ajax({
            url: config.apiUrl + '/change-password',
            headers: {
              'Authorization': 'Bearer ' + store.user.token
            },
            method: 'PATCH',
            data: data
        });

        statusViewMessageArea.displayMessage(
            `Your password was succeefully updated.`); 

        //git statuviewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView);
    }
    catch(error) { 
        console.log(error);
        statusViewMessageArea.displayMessage(
            `Your attempt to change your password failed. Try again.`); 
    }
}; 


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new ChangePasswordViewController
//
class ChangePasswordViewController {

    // This constructor just regiesters the changePassword and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // injectables - Contains all of the dependencies that this controller
    //               might need.
    //         
    constructor(injectables) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those functions use these variables.
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;
        config = injectables.config;
        store = injectables.store;
        statusViewMessageArea = injectables.statusMessageView;

        // This handles the button click on the create account view.
        submitButton.on('submit', createAccountHandler);

        // This handles the return to options button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));
    }
}


module.exports = ChangePasswordViewController;