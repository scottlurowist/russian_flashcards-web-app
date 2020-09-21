////////////////////////////////////////////////////////////////////////////////
// 
// changePasswordView.js
//
// This file acts as an MVC controller for the change password view. It handles
// events from the view, obtains data from the model, and uses the
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
const changePasswordViewForm = $('#change-password-view-form');
const oldPasswordTextField = $('#old-password');
const newPasswordTextField = $('#new-password');
const submitFormButton =  $('#change-password-view-form');
const submitButton = $('#change-password-view-submit-btn');
const returnButton = $('#change-password-view-return-btn');




// Resets the view to its initial condition; input fields are emoty, buttons 
// are enabled / disabled as appropriate, etc.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const resetView = () => {

    oldPasswordTextField.val('');
    newPasswordTextField.val('');
    
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
    
    if (oldPasswordTextField.val() !== '' &&
        newPasswordTextField.val() !== '') {

        submitButton.prop('disabled', false);        
    }
};


// Invokes the model that changes a password.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const changePasswordHandler = async event => {

    event.preventDefault();

    const data =  {
        "passwords": {
          "old": oldPasswordTextField.val(),
          "new": newPasswordTextField.val()
        }
    }

    try {
        // The model changes the password.
        const foo =await model.invokeService('/change-password', 'PATCH', data,
                                             store.user.token);

        statusViewMessageArea.displayMessage(
            'Your password was updated successfully.'); 
    }
    catch(error) { 
        statusViewMessageArea.displayMessage(
            'Your attempt to change your password failed. Please try again.'); 
    }
    finally {
        resetView(); 
    }
}; 


// An ES6 class that acts as a controller for the change password view.
//
class ChangePasswordViewController {

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

        // This handles the change password view button click .
        submitFormButton.on('submit', changePasswordHandler);

        // Handle keypresses in our input fields so that we can 
        // enable the change password button as appropriate.
        oldPasswordTextField.on('input', inputFieldKeypressHandler);
        newPasswordTextField.on('input', inputFieldKeypressHandler);

        // This handles the return to options view button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView(viewStates.changePasswordView,
            changePasswordViewForm, null);    
    }
}


module.exports = ChangePasswordViewController;