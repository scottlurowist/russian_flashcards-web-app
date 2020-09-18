////////////////////////////////////////////////////////////////////////////////
// 
// viewPseudoStateMachine.js
//
// This file acts as a pseudo-state machine to centrally manage the various 
// display of views at the correct time. Central management of the views keeps
// the rest of the code simpler and allows us to be DRY.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// This object is exposed to the rest of the app so that the app can state
// it next desired state and pass that state to transitionToState below.
const viewStates = {

    "homeView": "homeView",
    "signUpView": "signUpView",
    "signInView": "signInView"
}

// Cache the DOM queries. These are not exposed to the rest of the app.
const homeViewJQuerySelector = $('#home-view');

// The signup View.
const signUpViewJQuerySelector = $('#sign-up-view-form');


// An ES6 class that acts as a pseudo-state machine for managing views in the
// flashcard app. 
// functionality is encaspsulated by this class.
//
// to use:
// new ViewPseudoStateMachine
//
class ViewPseudoStateMachine {

    constructor() {

        // The initial state of the app is the home view.
        this.transitionToState(viewStates.homeView);
    }


    // Navigates to the next "view" in the SPA, as defined by nextState.
    //
    // nextState - one of the viewStates defined above.
    //
    transitionToState(nextState) { }        
}


module.exports = {
    viewStates,
    ViewPseudoStateMachine
}