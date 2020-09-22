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
    "deleteFlashcardView": "deleteFlashcardView",    
    "flashcardOptionsView": "flashcardOptionsView",    
    "homeView": "homeView",
    "signUpView": "signUpView",
    "signInView": "signInView",
    "updateFlashcardView": "updateFlashcardView",
    "viewFlashcardsView": "viewFlashcardsView"         
};




// This array holds registration information from controllers for
// resetting and showing views.
const privatePageStatesMap = [];


// An ES6 class that acts as a pseudo-state machine for managing views in the
// flashcard app. 
// functionality is encaspsulated by this class.
//
// to use:
// new ViewPseudoStateMachine
//
class ViewPseudoStateMachine {

    constructor() {};


    // This method is invoked by controllers for registering their view
    // name, jQuery selector, and the the controller method that resets
    // the view.
    //
    // viewName - The name of a view as defined by viewStates.
    // viewJQuerySelector - the jQuery selector to the view to be shown and
    //                      hidden.
    // viewResetHandler - a controller callback function that implements
    //                    the details of resetting a view.
    // 
    registerView(viewName, viewJQuerySelector, viewResetHandler = null) {
        privatePageStatesMap.push({
            viewName,
            viewJQuerySelector,
            viewResetHandler
        });
    }


    // Navigates to the next "view" in the SPA, as defined by nextState.
    // It invokes the reset handler if it exists, and then hides all views
    // but the view to be shown.
    //
    // nextState - One of the viewStates defined above.
    //
    transitionToState(nextState) { 

        // The logic is simplest if we hide every view of the app
        // and then finally show the view designated by nextState.
        // We never hide the status message view area.
        privatePageStatesMap.forEach(view => {
            // Reset the view if it has a reset handler.
            if (view.viewResetHandler) view.viewResetHandler();

            if (view.viewName === nextState) {
                view.viewJQuerySelector.show();             
            }
            else {
                view.viewJQuerySelector.hide();
            }
        });
    }        
}


module.exports = {
    viewStates,
    ViewPseudoStateMachine
};