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
    "signInView": "signInView",
    "flashcardOptionsView": "flashcardOptionsView",
    "changePasswordView": $('#change-password-view')
};


// This maps viewStates to actual cached jQuery queries for hiding
// partial pages.
const privatePageStatesMap = {

    "homeView": $('#home-view'),
    "signUpView": $('#sign-up-view-form'),
    "signInView": $('#sign-in-view-form'),
    "flashcardOptionsView": $('#flashcard-options-view'),
    "changePasswordView": $('#change-password-view')
};


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
    transitionToState(nextState) { 

        // The logic is simplest if we hide every view of the app
        // and then finally show the view designated by nextState.
        // We never hide the status message view area.
        for(let currentPageInfo in privatePageStatesMap) {

            privatePageStatesMap[currentPageInfo].hide();
        }

        privatePageStatesMap[nextState].show();
    }        
}


module.exports = {
    viewStates,
    ViewPseudoStateMachine
};