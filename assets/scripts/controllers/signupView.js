////////////////////////////////////////////////////////////////////////////////
// 
// signupView.js
//
// This file acts as an MVC controller for the signup view. It handles events
// from the view, obtains data from the model, and uses the
// ViewPseudoStateMachine to declare its intention for navigation.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// An instance of ViewPseudoStateMachine for managing views.
let viewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let viewStates;

// The view to which we write error messages.
let statusViewMessageArea;

// The model in our MVC architecture.
let model;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const signupViewForm = $('#sign-up-view-form')
const emailTextField = $('#sign-up-email');
const passwordTextField = $('#sign-up-password');
const confirmationPasswordTextField = $('#sign-up-password_confirmation');
const submitFormButton =  $('#sign-up-view-form');
const submitButton = $('#create-account-view-submit-btn');
const returnButton = $('#create-account-view-return-btn');




// Resets the view to its initial condition; input fields are emoty, buttons 
// are enabled / disabled as appropriate, etc.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const resetView = () => {

    emailTextField.val('');
    passwordTextField.val('');
    confirmationPasswordTextField.val('');    
    
    submitButton.prop('disabled', true);
};   


// Handles input field keypresses in order to determine whether buttons should
// be enabled / disabled as appropriate.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const inputFieldKeypressHandler = event => {
    
    if (emailTextField.val() !== '' && 
        passwordTextField.val() !== '' && 
        confirmationPasswordTextField.val() !== '') {

        submitButton.prop('disabled', false);        
    }
};


// Invokes the model that creates a user account.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
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
        // The model creats the user account.
        await model.invokeService('/sign-up', 'POST', data);

        statusViewMessageArea.displayMessage(
            `The account for ${emailTextField.val()} was successfully created.`); 

        viewPseudoStateMachine.transitionToState(viewStates.signInView);       
    }
    catch(error) { 
        statusViewMessageArea.displayMessage(
            `The account creation for ${emailTextField.val()} failed. Please try again.`); 
    }
}; 


// An ES6 class that acts as a controller for the signup view.
//
class SignupViewController {

    // This constructor chooses the injectables it needs in order to fulfill
    // its purpose. It also registers view events, defines public methods,
    // and invokes private functions, and declares its intent for navigation
    // by delegating to the ViewPseudoStateMachine.
    //
    // injectables - Contains all of the dependencies that this controller
    //               might need.
    //            
    constructor(injectables) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those functions use these variables.
        model = injectables.webAPIModel;
        statusViewMessageArea = injectables.statusMessageView;        
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;  

        // Handle keypresses in our input fields so that we can 
        // enable the change password button as appropriate.
        emailTextField.on('input', inputFieldKeypressHandler);
        passwordTextField.on('input', inputFieldKeypressHandler);    
        confirmationPasswordTextField.on('input', inputFieldKeypressHandler);      

        // This handles the button click on the create account view.
        submitFormButton.on('submit', createAccountHandler);

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView(viewStates.signUpView,
            signupViewForm, resetView);

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.homeView));
    }
}


module.exports = SignupViewController;