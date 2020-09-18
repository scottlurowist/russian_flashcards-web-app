////////////////////////////////////////////////////////////////////////////////
// 
// signupView.js
//
// This file acts as an MVC controller for the signup view. I
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
const emailTextField = $('#sign-up-email');
const passwordTextField = $('#sign-up-password');
const confirmationPasswordTextField = $('#sign-up-password_confirmation');


// Invokes the web service that creates a user.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const createAccountHandler = async event => {

    event.preventDefault();

    const data =  {
        "credentials": {
          "email": emailTextField.val(),
          "password": passwordTextField.val(),
          "password_confirmation": confirmationPasswordTextField.val()
        }
    }

    try {
        const result = await $.ajax({
            url: config.apiUrl + '/sign-up',
            method: 'POST',
            data: data
          })

        statusViewMessageArea.displayMessage(
            `The account for ${emailTextField.val()} was successfully created.`); 

        viewPseudoStateMachine.transitionToState(viewStates.signInView);
    }
    catch(error) { 
        let foo = error;
        statusViewMessageArea.displayMessage(
            `The account creation for ${emailTextField.val()} failed. Try again.`); 
    }
}; 


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new SignupViewController
//
class SignupViewController {

    // This constructor just regiesters the signup and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // injectables - Contains all of the dependencies that this controller
    //               might need.
    //         
    constructor(injectables) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those functions use these variables.
        viewPseudoStateMachine = injectables.viewPseudoStateMachinegit;
        viewStates = injectables.viewStates;
        config = injectables.config;
        store = injectables.store;
        statusViewMessageArea = injectables.statusMessageView;

        // This handles the button click on the create account view.
        submitButton.on('submit', createAccountHandler);
    }
}


module.exports = SignupViewController;