////////////////////////////////////////////////////////////////////////////////
// 
// pseudoViewStateMachine.js
//
// This file acts as a pseudo-state machine to centrally manage the various 
// display of pages at the correct time. Central management of the pages keeps
// the rest of the code simpler and allows us to be DRY.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// This object is exposed to the rest of the app so that the app can state
// it next desired state and pass that state to transitionToState below.
const pageStates = {

    "homePage": "homePage",
    "signUpPage": "signUpPage",
    "signInPage": "signInPage"
}

// Cache the DOM queries. These are not exposed to the rest of the app.
const homePageJQuerySelector = $('#home-page');

// The signup page.
const signUpPageJQuerySelector = $('#sign-up-page-form');


// An ES6 class that acts as a pseudo-state machine for managing views in the
// flashcard app. 
// functionality is encaspsulated by this class.
//
// to use:
// new ViewPseudoStateMachine
//
class ViewPseudoStateMachine {

    constructor() {

        // The initial state of the app is the homepage.
        this.transitionToState(pageStates.homePage);
    }


    // Navigates to the next "page" in the SPA, as defined by nextState.
    //
    // nextState - one of the pageStates defined above.
    //
    transitionToState(nextState) {
        alert(nextState)
    }        
}


module.exports = {
    pageStates,
    ViewPseudoStateMachine
}