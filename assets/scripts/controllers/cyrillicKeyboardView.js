////////////////////////////////////////////////////////////////////////////////
// 
// cyrillicKeyboardView.js
//
// This file acts as an MVC controller for the cyrillic keyboard view.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
// const emailTextField = $('#sign-in-email');
// const passwordTextField = $('#sign-in-password');



// An ES6 class that acts as a controller for the Cyrillic keyboard view. All
// home view functionality is encaspsulated by this class.
//
// to use:
// new CyrillicKeboardViewController
//
class CyrillicKeboardViewController {

    // This constructor just regiesters the signup and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // injectables - Contains all of the dependencies that this controller
    //               might need.
    //         
    constructor(injectables) {
        
    }
}


module.exports = CyrillicKeboardViewController;