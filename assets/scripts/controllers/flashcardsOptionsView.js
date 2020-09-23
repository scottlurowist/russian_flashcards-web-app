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

// store - An object to which we can attach information at runtime, such as the
// authenticated user.
let store;

// The view to which we write error messages.
let statusViewMessageArea;

// The model in our MVC architecture.
let model;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const flashcardsOptionsView = $('#flashcard-options-view');
const createFlashcardButton =  $('#create-flashcard-button');
const changePasswordButton = $('#change-password-button');
const deleteFlashcardButton = $('#delete-flashcard-button');
const exitButton = $('#exit-flashcards-app-button');
const updateFlashcardButton = $('#update-flashcard-button');
const viewFlaschardsButton = $('#view-flashcards-button');




// Resets the view to its initial condition; input fields are emoty, buttons 
// are enabled / disabled as appropriate, etc.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const resetView = () => {

    statusViewMessageArea.displayMessage('Please choose an option below');
}; 


// Invokes the web service that signs out of the app.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const signoutHandler = async event => {

    event.preventDefault();

    try {
        // The model signs into the user account.
        await model.invokeService('/sign-out', 'DELETE', null, store.user.token);

        statusViewMessageArea.displayMessage(
            `You have exited the Russian Flashcards app.`); 

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
        model = injectables.webAPIModel;
        store = injectables.store;
        statusViewMessageArea = injectables.statusMessageView;
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;        

        // This handles the transition to the create flashcard view.
        createFlashcardButton.on('click', () =>
            viewPseudoStateMachine.transitionToState(viewStates.createFlashcardView));

        // This handles the transition to the update flashcard view.            
        updateFlashcardButton.on('click', () =>             
            viewPseudoStateMachine.transitionToState(viewStates.updateFlashcardView));

        // This handles the transition to the delete flashcard view. 
        deleteFlashcardButton.on('click', () =>
            viewPseudoStateMachine.transitionToState(viewStates.deleteFlashcardView));    

        // This handles the transition to the view flashcards view.             
        viewFlaschardsButton.on('click', () =>
            viewPseudoStateMachine.transitionToState(viewStates.viewFlashcardsView));            

        // This handles the transition to the change password view.
        changePasswordButton.on('click',
            () => viewPseudoStateMachine.transitionToState(viewStates.changePasswordView));

        // This handles signing out of the app and returning to the home view.
        exitButton.on('click', signoutHandler );


        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView('flashcardOptionsView',
            flashcardsOptionsView, resetView);            
    }
}


module.exports = SignupViewController;