////////////////////////////////////////////////////////////////////////////////
// 
// homeView.js
//
// This file acts as an MVC controller for the home view. It simply delegates
// button clicks to the viewPseudoStateMachine.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// An instance of ViewPseudoStateMachine for managing views.
let ViewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let viewStates;


// Signals the home views's intent to the viewPseudoStateMachine to navigate
// to the signup view. The viewPseudoStateMachine worries about the details
// of displaying the signup view.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const onNavigateToSignupView = () => {

    ViewPseudoStateMachine.transitionToState(viewStates.signUpView);
};


// Signals the home views's intent to the viewPseudoStateMachine to navigate
// to the signin view. The viewPseudoStateMachine worries about the details
// of displaying the signin view.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const onNavigateToSigninView = () => {

    ViewPseudoStateMachine.transitionToState(viewStates.signInView);
};


// An ES6 class that acts as a controller for the home view. All home view
// functionality is encaspsulated by this class.
//
// to use:
// new HomeViewController
//
class HomeViewController {

    // This constructor just regiesters the signup and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // ViewPseuedoStateMachine - An instance of ViewPseudoStateMachine.
    //
    // viewStatesEnumeration - An instance of viewStates from the
    // viewPseudoStateMachine module that allows this controller to state its
    // intention for view changes.
    constructor(viewPseuedoStateMachine, viewStatesEnumeration) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those functions use these variables.
        ViewPseudoStateMachine = viewPseuedoStateMachine;
        viewStates = viewStatesEnumeration;

        $('#home-view-create-account-button').on('click', onNavigateToSignupView);
        $('#home-view-sign-in-button').on('click', onNavigateToSigninView);
    }
}


module.exports = HomeViewController;