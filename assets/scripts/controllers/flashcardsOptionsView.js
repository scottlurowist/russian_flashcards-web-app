////////////////////////////////////////////////////////////////////////////////
// 
// flashcardsOptionsView.js
//
// This file acts as an MVC controller for the flashcards options view. I
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
const submitButton =  $('#sign-up-view-form');
const changePasswordButton = $('#change-password-button');
const exitButton = $('#exit-flashcards-app-button');


// Invokes the web service that signs out of the app.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const signoutHandler = async event => {

    event.preventDefault();

    try {
        await $.ajax({
            url: config.apiUrl + '/sign-out',
            headers: {
              'Authorization': 'Bearer ' + store.user.token
            },
            method: 'DELETE'
        })

        statusViewMessageArea.displayMessage(
            `You have exited the app.`); 

        viewPseudoStateMachine.transitionToState(viewStates.homeView);
    }
    catch(error) { 

        statusViewMessageArea.displayMessage(
            `Your attempt to signout failed. Try again.`); 
    }
}; 


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new SignupViewController
//
class SignupViewController {

    // This constructor just registers the signup and signin button
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

        // This handles the return to homepage button click.
        changePasswordButton
            .on('click', () => viewPseudoStateMachine.transitionToState(viewStates.changePasswordView));

        // This handles the return to homepage button click.
        exitButton.on('click', signoutHandler );
    }
}


module.exports = SignupViewController;