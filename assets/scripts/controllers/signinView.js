////////////////////////////////////////////////////////////////////////////////
// 
// signupView.js
//
// This file acts as an MVC controller for the signin view. It handles events
// from the view, obtains data from the model, and uses the
// ViewPseudoStateMachine to declare its intention for navigation.
//
////////////////////////////////////////////////////////////////////////////////

'use strict'


// An instance of ViewPseudoStateMachine for managing views.
let viewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let viewStates;

// store - An object to which we can attach information at runtime, such as the
// authenticated user.
let store;

// The view to which we write error messages.
let statusViewMessageArea;

// The model in our MVC architecture.
let model;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const signInViewForm = $('#sign-in-view-form');
const emailTextField = $('#sign-in-email');
const passwordTextField = $('#sign-in-password');
const submitFormButton =  $('#sign-in-view-form');
const submitButton = $('#sign-in-view-submit-btn');
const returnButton = $('#signin-view-return-btn');




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
    
    submitButton.prop('disabled', true); 
    
    statusViewMessageArea.displayMessage('Signin to Russian Flashcards');
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
        passwordTextField.val() !== '') {

        submitButton.prop('disabled', false);        
    }
};


// Invokes the model that signs in a user to their account.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const signinHandler = async event => {

    event.preventDefault();

    const data =  {
        "credentials": {
          "email": emailTextField.val(),
          "password": passwordTextField.val()
        }
    }

    try {
        // The model signs into the user account.
        const response = await model.invokeService('/sign-in', 'POST', data);

        store.user = response.user;

        statusViewMessageArea.displayMessage(
            `Welcome ${emailTextField.val()} to Russian Flashcards / карточки на русском.`); 

        viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView);       
    }
    catch(error) { 
        statusViewMessageArea.displayMessage(
            `Signin failed for user ${emailTextField.val()}. Please try again.`); 
        
        resetView();    
    }
}; 


// An ES6 class that acts as a controller for the signin view.
//
class SigninViewController {

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
        store = injectables.store;    
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;  

        // Handle keypresses in our input fields so that we can 
        // enable the change password button as appropriate.
        emailTextField.on('input', inputFieldKeypressHandler);
        passwordTextField.on('input', inputFieldKeypressHandler);    

        // This handles the button click on the create account view.
        submitFormButton.on('submit', signinHandler);

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.homeView));

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView(viewStates.signInView, signInViewForm,
            resetView);          
    }
}


module.exports = SigninViewController;