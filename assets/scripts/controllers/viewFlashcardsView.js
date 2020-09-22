////////////////////////////////////////////////////////////////////////////////
// 
// updateFlashcardView.js
//
// This file acts as an MVC controller for the update flashcard view. It handles
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

// The flashcards to be reviewed in this view.
let flashcardsToReview = [];

// When a radio button is selected, this will be equal to the 
// language which the user wants to type for reviewing flashcards.
let inputLanguage;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const viewFlashcardsViewForm = $('#view-flashcards-view-form');
const englishRadioButton = $('#english-rb');
const russianRadioButton = $('#russian-rb');
const englishInputTextField = $('#view-flashcards-view-form-english-text');
const russianInputTextField = $('#view-flashcards-view-form-russian-text');
const startFlashcardsButton =  $('#start-flashcards-review-btn');
const correctButton = $('#view-flashcards-view-form-correct');
const nextButton = $('#view-flashcards-view-next-btn');
const returnButton = $('#view-flashcards-view-return-btn');




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

    // englishInputTextField.val('');
    // englishInputTextField.prop('disabled', false);
    // russianInputTextField.val('');
    // russianInputTextField.prop('disabled', false);

    // cyrillicKeyboard.disableCyrillicKeyboard(false);
}; 
        
// Display either the Russian word and let the user type in Cyrillic, or 
// load the Russian word and let the user type in English. This is 
// controlled but the pair of radio buttons in the view. It randomly
// selects the flashcard to display from the deck of available flashcards,
// not repeating a previously displayed flashcard.
//
const displayFlashcard = () => {

    // Clear the input fields.
    englishInputTextField.val('');
    russianInputTextField.val('');

    // There are no flashcards to display.
    if (flashcardsToReview.length === 0) {

        statusViewMessageArea.displayMessage(
            'There are no more flashcards left. Click "start" to view again.');
        return;
    }
    let index;

    // Choose a randon value between zero and one less than the length of the array.
    // We'll slice the array at that point in an attempt to show the flashcards 
    // in random order. If there is a single flashcard left, then simply 
    // return an index of zero.
    if (flashcardsToReview.length === 1) {

        index = 0;
    }
    else {
        index = 
            Math.floor(Math.random() * Math.floor(flashcardsToReview.length - 1)) 
    }

    // Use splice since it will alter the orgininal array, making
    // one less flashcard. It will always be an array of one flashcard,
    // so we must extract the flashcard from the array.
    const currentFlashcard = 
        flashcardsToReview.splice(index, 1)[0];
        
    store.currentFlashcard = currentFlashcard;

    if (inputLanguage === 'english') {
        englishInputTextField.val(currentFlashcard.englishWord);
    }
    else {
        russianInputTextField.val(currentFlashcard.russianWord);   
    }
};


// Invokes the model that loads flashcards for review.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const loadFlashcards = async event => {

    event.preventDefault();

    try {

        // The model that finds flashcards.
        const result = await model.invokeService('/flashcards', 'GET', null,
                                                 store.user.token);

        flashcardsToReview = result.flashcards;
        statusViewMessageArea.displayMessage('The flashcards were loaded.'); 
        displayFlashcard();
    }
    catch(err) {
        statusViewMessageArea.displayMessage('Your flashcards could not be loaded.'); 
    }
}


// Determines which input language to use for reviewing flashcards.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const radioButtonHandler = event => {

    if (englishRadioButton.is(':checked')) inputLanguage = "english";
    if (russianRadioButton.is(':checked')) inputLanguage = "russian";
}


const checkIfAnswerIsCorrect = event => {

    event.preventDefault();

    // The message we display to the status message area.
    let message;

    const currentFlashcard = store.currentFlashcard;

    const englishGuess = englishInputTextField.val();
    const russianGuess = russianInputTextField.val();

    if (currentFlashcard.englishWord === englishGuess &&
        currentFlashcard.russianWord === russianGuess ) {

       message = 'You answered correctly.'           
    }
    else {
        message = 'You answered incorrectly. You need more practice.' 

    }

    statusViewMessageArea.displayMessage(message);     
}

// An ES6 class that acts as a controller for the change password view.
//
class ViewFlashcardsViewController {

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
        //findButton.on('click', findFlashcardHandler);

        englishRadioButton.on('click', radioButtonHandler);     
        russianRadioButton.on('click', radioButtonHandler);        

        // Register a callback handler that will handle keypresses
        // from the Cyrillic keyboard. The handler will populate the 
        // input field for the Russian word. This is following the 
        // Gang of Four Observer pattern.
        cyrillicKeyboard
            .registerKeypressCallback(cyrillicKeyboardKeypressHandler);

        // Invoked when the user clicks the start button. The deck of flashcards
        // are loaded from the web service, and the first one randomly selected.
        // Subsequent flashcards are displayed when the user clicks the "next"
        // button.           
        startFlashcardsButton.on('click', loadFlashcards);  

        correctButton.on('click', checkIfAnswerIsCorrect);

        nextButton.on('click', displayFlashcard);

        // This handles the return to homepage button click.
        returnButton.on('click', 
            () => viewPseudoStateMachine.transitionToState(viewStates.flashcardOptionsView));

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView(viewStates.viewFlashcardsView,
            viewFlashcardsViewForm, resetView());             
    }
}


module.exports = ViewFlashcardsViewController;