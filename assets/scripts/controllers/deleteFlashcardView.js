////////////////////////////////////////////////////////////////////////////////
// 
// deleteFlashcardView.js
//
// This file acts as an MVC controller for the delete flashcard. It handles
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

// The Cyrillic keyboard controller.
let cyrillicKeyboard;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const deleteFlashcardViewForm = $('#delete-flashcard-view');
const englishInputTextField = $('#delete-flashcard-view-form-english-text');
const russianInputTextField = $('#delete-flashcard-view-form-russian-text');
const findButton = $('#delete-flashcard-view-form-find');
const returnButton = $('#delete-flashcard-view-return-btn');




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


// Resets the view to its initial condition; input fields are emoty, buttons 
// are enabled / disabled as appropriate, etc.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const resetView = () => {

    englishInputTextField.val('');
    russianInputTextField.val('');

    statusViewMessageArea.displayMessage(
        'Type an English or a Russian word and click "Find"');    
};   


// Invokes the model that finds a flashcard.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const findFlashcardHandler = async event => {

    event.preventDefault();

    try {
        // The model that finds flashcards.
        const result = await model.invokeService('/flashcards', 'GET', null,
                                              store.user.token);
        let wordWasFound = false;

        for (let currentFlashcard of result.flashcards) {
            if (englishInputTextField.val() === currentFlashcard.englishWord ||
                russianInputTextField.val() === currentFlashcard.russianWord) {
                
                wordWasFound = true;

                englishInputTextField.val(currentFlashcard.englishWord);
                russianInputTextField.val(currentFlashcard.russianWord);

                // Store our flashcard to the store because the user could
                // click delete minutes later.
                store.flashcardToDelete = currentFlashcard;
                
                break;    
            }
        } 
        
        if (wordWasFound) {
            statusViewMessageArea.displayMessage('The flashcard was found');            
        }
        else {
            resetView();
            statusViewMessageArea.displayMessage('The flashcard was not found');
        }
    }
    catch(error) { 
        resetView();        
        statusViewMessageArea.displayMessage(
            'Your attempt to retrieve your flashcard failed. Please try again.'); 
    }
}



// Invokes the model that deletes a flashcard.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const deleteFlashcardHandler = async event => {

    event.preventDefault();

    try {
        // The model that deletes flashcards.
        await model.invokeService('/flashcards', 'DELETE', null,
            store.user.token, store.flashcardToDelete._id);

        resetView();

        statusViewMessageArea.displayMessage('The flashcard was successully deleted.');            
    }
    catch(err) {
        resetView();

        statusViewMessageArea.displayMessage(
            'The flashcard delete failed. Please try again.'); 
    }
}


// An ES6 class that acts as a controller for the change password view.
//
class DeleteFlashcardViewController {

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
        cyrillicKeyboard = injectables.cyrillicKeyboardView;
        model = injectables.webAPIModel;
        statusViewMessageArea = injectables.statusMessageView;        
        store = injectables.store;
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;  

        // Our find buttons retrieve all flashcards from the web service and 
        // look for a match.           
        findButton.on('click', findFlashcardHandler);

        // Handles the submit button for the delete flashcard form.           
        deleteFlashcardViewForm.on('submit', deleteFlashcardHandler); 

        // Register a callback handler that will handle keypresses
        // from the Cyrillic keyboard. The handler will populate the 
        // input field for the Russian word. This is following the 
        // Gang of Four Observer pattern.
        cyrillicKeyboard
            .registerKeypressCallback(cyrillicKeyboardKeypressHandler);

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView(viewStates.deleteFlashcardView,
            deleteFlashcardViewForm, resetView);                
    }
}


module.exports = DeleteFlashcardViewController;