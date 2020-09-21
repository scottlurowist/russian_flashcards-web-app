////////////////////////////////////////////////////////////////////////////////
// 
// cyrillicKeyboardView.js
//
// This file acts as an MVC controller for the cyrillic keyboard view. It 
// implements the Gang of Four Observer pattern; controllers register callbacks
// so as to be notified of Cyrillic keypress events.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// An array that holds callback handlers from other controllers that want to be
// notified when a Cyrillic keypress has happened.
const keypressCallbackHandlers = [];


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
// const emailTextField = $('#sign-in-email');
const cyrillicButton = $('.cyrillic__button ');




// Handles keypresses from the Cyrillic soft keyboard, and invokes
// the registered callbacks from other controllers that wish to be 
// notified of keypresses.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
//
const cyrillicKeypressHandler = event => {

    event.preventDefault();

    // Which Cyrillic character was pressed?
    const cyrillicCharacter = event.currentTarget.innerText;

    // Notify controllers that want to know about Cyrillic keyboard
    // presses.
    keypressCallbackHandlers.forEach(handler => {
        handler(cyrillicCharacter);
    });
};


// An ES6 class that acts as a controller for the Cyrillic keyboard view. 
//
class CyrillicKeyboardViewController {

    // This constructor registers Cyrillic keyboard kepresses.
    //       
    constructor() {

        // This handles keypresses from the Cyrillic soft keyboard.
        cyrillicButton.on('click', cyrillicKeypressHandler);
    }


    // Enables / disables the Cyrillic keyboard.
    //
    // isDisabled - a boolen value that disables the keyboard when isDisabled
    // is true; otherwise the keyboard is enabled.
    //   
    disableCyrillicKeyboard(isDisabled) {
        cyrillicButton.prop('disabled', isDisabled);
    } 


    // Registers callback handlers from other controllers that are interested
    // in keypresses from the Cyrillic keyboard. This implements the Gang of
    // Four Observer pattern.
    registerKeypressCallback(keypressCallbackHandler) {
        keypressCallbackHandlers.push(keypressCallbackHandler);
    }
}


module.exports = CyrillicKeyboardViewController;