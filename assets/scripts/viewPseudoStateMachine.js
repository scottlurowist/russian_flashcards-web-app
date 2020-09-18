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
    "signUpPage": "signUpPage"
}

// Cache the DOM queries. These are not exposed to the rest of the app.
const homePageJQuerySelector = $('#home-page');

// The signup page.
const signUpPageJQuerySelector = $('#sign-up-page-form');

// This method should be invoked when the app is started. It sets the
// initial view state of the app to the home page.
const initialize = () => {
    
    // We need to call this as if we are outside of this module 
    // because we have to pass a string representing our initial state.
    transitionToState(pageStates.homePage);
}


// Navigates to the next "page" in the SPA, as defined by nextState.
//
// nextState - one of the pageStates defined above.
//
const transitionToState = (nextState) => {

    alert("Hello from the state machine");
}


module.exports = {

    initialize,
    pageStates,
    transitionToState
}