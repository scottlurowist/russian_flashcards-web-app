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
const button = $('.cyrillic__button ');


// Handles keypresses from the Cyrillic soft keyboard, and invokes
// the registered callbacks from other controllers that wish to be 
// notified of keypresses.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const cyrillicKeypressHandler = event => {

    event.preventDefault();

    const cyrillicCharacter = event.currentTarget.innerText;

    keypressCallbackHandlers.forEach(handler => {

        handler(cyrillicCharacter);
    });
};


// An ES6 class that acts as a controller for the Cyrillic keyboard view. All
// home view functionality is encaspsulated by this class.
//
// to use:
// new CyrillicKeboardViewController
//
class CyrillicKeyboardViewController {

    // This constructor just regiesters the signup and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // injectables - Contains all of the dependencies that this controller
    //               might need.
    //         
    constructor() {

        // This handles keypresses from the Cyrillic soft keyboard.
        button.on('click', cyrillicKeypressHandler);
    }


    // Registers callback handlers from other controllers that are interested
    // in keypresses from the Cyrillic keyboard. This implements the Gang of
    // Four Observer pattern.
    registerKeypressCallback(keypressCallbackHandler) {
        keypressCallbackHandlers.push(keypressCallbackHandler);
    }
}


module.exports = CyrillicKeyboardViewController;