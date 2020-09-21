////////////////////////////////////////////////////////////////////////////////
// 
// signinView.js
//
// This file acts as an MVC controller for the signin view.
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




// Resets the view to its initial condition; input fields are emoty, buttons 
// are enabled / disabled as appropriate, etc.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const resetView = () => {


}; 

// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const emailTextField = $('#sign-in-email');
const passwordTextField = $('#sign-in-password');
const submitButton =  $('#sign-in-view-form');
const returnButton = $('#signin-view-return-btn');


// Invokes the web service that signs in a user.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const signinHandler = async event => {

    event.preventDefault();

    const data =  {
        "credentials": {
          "email": emailTextField.val(),
          "password": passwordTextField.val()
        }
    }

    try {
        const response = await $.ajax({
            url: config.apiUrl + '/sign-in',
            method: 'POST',
            data: data
          })

        store.user = response.user;

        statusViewMessageArea.displayMessage(
            `Welcome ${emailTextField.val()} to Russian Flashcards / карточки на русском.`); 

        viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView);
    }
    catch(error) { 
        statusViewMessageArea.displayMessage(
            `Signin failed ${emailTextField.val()}. Please try again.`); 
    }
}; 


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new SignupViewController
//
class SigninViewController {

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
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;
        config = injectables.config;
        store = injectables.store;
        statusViewMessageArea = injectables.statusMessageView;

        // This handles the button click on the create account view.
        submitButton.on('submit', signinHandler);

        // This handles the return to homepage button click.
        returnButton.on('click', () => viewPseudoStateMachine.transitionToState(viewStates.homeView));

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView('signInView', $('#sign-in-view-form'));          
    }
}


module.exports = SigninViewController;