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
const englishInputTextField = $('#create-flashcard-view-form-english-text');
const russianInputTextField = $('#create-flashcard-view-form-russian-text');
const createFlashcardButton =  $('#create-flashcard-view-form');
const returnButton = $('#create-flashcard-view-return-btn');




// Handles Cyrillic soft keyboard presses from the cyrillicKeyboardView.
// This implements the Gang of Four Observer pattern.
//
// cyrillicCharacter - The value of a keypress from the Cyrillic soft
//                     keyboard. 
const cyrillicKeyboardKeypressHandler = (cyrillicCharacter) => {

    // Add the Cyrillic character to the input field, but don't overwrite
    // what has already been typed.
    russianInputTextField
        .val(russianInputTextField.val() + cyrillicCharacter);
};


/// Invokes the web service that creates a flashcard.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const createFlashcardHandler = async event => {

    event.preventDefault();

    const data =  {
        "flashcard": {
          "englishWord": englishInputTextField.val(),
          "russianWord": russianInputTextField.val()
        }
    }

    try {
        await $.ajax({
            url: config.apiUrl + '/flashcards',
            headers: {
                'Authorization': 'Bearer ' + store.user.token
              },            
            method: 'POST',
            data: data
        });

        statusViewMessageArea.displayMessage(
            'The flashcard was successfully created.'); 
    }
    catch(error) { 
        statusViewMessageArea.displayMessage(
            'The flashcard creation failed. Please try again.'); 
    }
}


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

        // Register a callback handler that will handle keypresses
        // from the Cyrillic keyboard. The handler will populate the 
        // input field for the Russian word. This is following the 
        // Gang of Four Observer pattern.
        injectables.cyrillicKeyboardView
                   .registerKeypressCallback(cyrillicKeyboardKeypressHandler);

        // Handles the submit button for the create flashcard form.           
        createFlashcardButton.on('submit', createFlashcardHandler); 

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));
    }
}


module.exports = CreateFlashcardViewController;