////////////////////////////////////////////////////////////////////////////////
// 
// updateFlashcardView.js
//
// This file acts as an MVC controller for the update flashcard view.
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
const englishInputTextField = $('#update-flashcard-view-form-english-text');
const russianInputTextField = $('#update-flashcard-view-form-russian-text');
const englishFindButton = $('');
const russianFindButton = $('');
const updateFlashcardButton =  $('#update-flashcard-view-form');
const returnButton = $('#update-flashcard-view-return-btn');




// Handles Cyrillic soft keyboard presses from the cyrillicKeyboardView.
// This implements the Gang of Four Observer pattern.
//
// cyrillicCharacter - The value of a keypress from the Cyrillic soft
//                     keyboard.
// 
const cyrillicKeyboardKeypressHandler = (cyrillicCharacter) => {

    // Add the Cyrillic character to the input field, but don't overwrite
    // what has already been typed.
    russianInputTextField
        .val(russianInputTextField.val() + cyrillicCharacter);
};


/// Invokes the web service that updates a flashcard.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const updateFlashcardHandler = async event => {

    event.preventDefault();

    // const data =  {
    //     "flashcard": {
    //       "englishWord": englishInputTextField.val(),
    //       "russianWord": russianInputTextField.val()
    //     }
    // }

    try {

        // Let's fetch all of our flashcards.
        const result = await $.ajax({
            url: config.apiUrl + '/flashcards',
            headers: {
                'Authorization': 'Bearer ' + store.user.token
              },            
            method: 'GET'
        });

        let wordWasFound = false;

        for (let currentFlashcard of result.flashcards) {
            if (englishInputTextField.val() === currentFlashcard.englishWord ||
                russianInputTextField.val() === currentFlashcard.russianWord) {
                
                statusViewMessageArea.displayMessage('The flashcard was found');
                wordWasFound = true;

                englishInputTextField.val(currentFlashcard.englishWord);
                russianInputTextField.val(currentFlashcard.russianWord);
                
                break;    
            }
        }

        if (!wordWasFound) {
            statusViewMessageArea.displayMessage('The flashcard was not found. Try another word.');            
        }
    }
    catch(err) {
        console.log(err)
        statusViewMessageArea.displayMessage(
            'The flashcard update failed. Please try again.'); 
    }
}


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new UpdateFlashcardViewController
//
class UpdateFlashcardViewController {

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

        // Our find buttons retrieve all flashcards from the web service and 
        // look for a match.           
        englishFindButton.on('click', updateFlashcardHandler);
        russianFindButton.on('click', updateFlashcardButton);           

        // Handles the submit button for the update flashcard form.           
        updateFlashcardButton.on('submit', updateFlashcardHandler); 

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));
    }
}


module.exports = UpdateFlashcardViewController;