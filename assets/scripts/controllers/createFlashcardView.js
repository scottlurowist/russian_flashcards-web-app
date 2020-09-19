////////////////////////////////////////////////////////////////////////////////
// 
// createFlashcardView.js
//
// This file acts as an MVC controller for the create flashcard view.
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
// const emailTextField = $('#sign-in-email');
// const passwordTextField = $('#sign-in-password');
const submitButton =  $('#sign-in-view-form');
const returnButton = $('#create-flashcard-view-return-btn');



// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new CreateFlashcardViewController
//
class CreateFlashcardViewController {

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

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));
    }
}


module.exports = CreateFlashcardViewController;