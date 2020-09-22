////////////////////////////////////////////////////////////////////////////////
// 
// createFlashcardView.js
//
// This file acts as an MVC controller for the create flashcard view. It handles
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
const createFlashcardViewForm = $('#create-flashcard-view');
const englishInputTextField = $('#create-flashcard-view-form-english-text');
const russianInputTextField = $('#create-flashcard-view-form-russian-text');
const returnButton = $('#create-flashcard-view-return-btn');




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
    englishInputTextField.prop('disabled', false);
    russianInputTextField.val('');
    russianInputTextField.prop('disabled', false);

    cyrillicKeyboard.disableCyrillicKeyboard(false);
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
        // The model that deletes flashcards.
        await model.invokeService('/flashcards', 'POST', data,
            store.user.token, null);

        statusViewMessageArea.displayMessage(
            'The flashcard was successfully created.'); 
    }
    catch(error) { 
        statusViewMessageArea.displayMessage(
            'The flashcard creation failed. Please try again.'); 
    }
}


// An ES6 class that acts as a controller for the delete flashcard view.
//
class CreateFlashcardViewController {

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


        // Handles the submit button for the update flashcard form.           
        createFlashcardViewForm.on('submit', createFlashcardHandler); 

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
        viewPseudoStateMachine.registerView(viewStates.createFlashcardView,
            createFlashcardViewForm, resetView);          
    }
}


module.exports = CreateFlashcardViewController;