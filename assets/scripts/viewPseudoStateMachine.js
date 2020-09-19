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
    "changePasswordView": "changePasswordView",
    "createFlashcardView": "createFlashcardView",
    "flashcardOptionsView": "flashcardOptionsView",    
    "homeView": "homeView",
    "signUpView": "signUpView",
    "signInView": "signInView",
    "updateFlashcardView": "updateFlashcardView"    
};


// This maps viewStates to actual cached jQuery queries for hiding
// partial views.
const privatePageStatesMap = {
    "changePasswordView": $('#change-password-view'),
    "createFlashcardView": $('#create-flashcard-view-form'),    
    "flashcardOptionsView": $('#flashcard-options-view'),    
    "homeView": $('#home-view'),    
    "signInView": $('#sign-in-view-form'),
    "signUpView": $('#sign-up-view-form'),
    "updateFlashcardView": $('#update-flashcard-view-form'),
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
    // nextState - One of the viewStates defined above.
    //
    transitionToState(nextState) { 

        // The logic is simplest if we hide every view of the app
        // and then finally show the view designated by nextState.
        // We never hide the status message view area.
        for(let currentViewInfo in privatePageStatesMap) {

            privatePageStatesMap[currentViewInfo].hide();
        }

        privatePageStatesMap[nextState].show();
    }        
}


module.exports = {
    viewStates,
    ViewPseudoStateMachine
};