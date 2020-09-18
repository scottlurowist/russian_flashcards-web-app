////////////////////////////////////////////////////////////////////////////////
// 
// signupView.js
//
// This file acts as an MVC controller for the signup view. I
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// An instance of ViewPseudoStateMachine for managing views.
let ViewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let viewStates;

//An instance of a GA provided module that manages dev and production
// URLs for us.
let config;

// store - An object to which we can attach information at runtime, such as the
// authenticated user.
let store;


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

        // TODO: Switch to the options page here when that is implemented.
        alert("account created!")
    }
    catch(error) { 
        // Do something here once I have the status area
        alert('some error happened.') 
    }
}; 


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new HomeViewController
//
class SignupViewController {

    // This constructor just regiesters the signup and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // VSiewPseuedoStateMachine - An instance of ViewPseudoStateMachine.
    //
    // viewStatesEnumeration - An instance of viewStates from the
    // viewPseudoStateMachine module that allows this controller to state its
    // intention for view changes.
    //
    // configuration - An instance of a GA provided module that manages dev 
    // and production URLs for us.
    //
    // infoStore - An object to which we can attach information at runtime, such
    //  as the authenticated user.
    //          
    constructor(viewPseuedoStateMachine, viewStatesEnumeration, configuration, infoStore) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those functions use these variables.
        ViewPseudoStateMachine = viewPseuedoStateMachine;
        viewStates = viewStatesEnumeration;
        config = configuration;
        store = infoStore;

        // This handles the button click on the create account view.
        submitButton.on('submit', createAccountHandler);
    }
}


module.exports = SignupViewController;