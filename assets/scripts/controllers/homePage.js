////////////////////////////////////////////////////////////////////////////////
// 
// homeView.js
//
// This file acts as an MVC controller for the home page. It simply delegates
// button clicks to the ViewPseudoStateMachine.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// An instance of ViewPseudoStateMachine for managing views.
let ViewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let pageStates;


// Signals the home page's intent to the viewPseudoStateMachine to navigate
// to the signup page. The viewPseudoStateMachine worries about the details
// of displaying the signup page.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const onNavigateToSignupPage = () => {

    ViewPseudoStateMachine.transitionToState(pageStates.signUpPage);
};


// Signals the home page's intent to the viewPseudoStateMachine to navigate
// to the signin page. The viewPseudoStateMachine worries about the details
// of displaying the signin page.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const onNavigateToSigninPage = () => {

    ViewPseudoStateMachine.transitionToState(pageStates.signInPage);
};


// An ES6 class that acts as a controller for the home page. All home page
// functionality is encaspsulated by this class.
//
// to use:
// new HomePageController
//
class HomePageController {

    // This constructor just regiesters the signup and signin button
    // click handlers. It also takes an instance of ViewPseudoStateMachine
    // in order to signal intent to the app to switch views.
    //
    // VSiewPseuedoStateMachine - An instance of ViewPseudoStateMachine.
    //
    // pageStates - An instance of pageStates from the viewPseudoStateMachine 
    // module that allows this controller to state its intention for view
    // changes.
    constructor(viewPseuedoStateMachine, pageStatesEnumeration) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those functions use these variables.
        ViewPseudoStateMachine = viewPseuedoStateMachine;
        pageStates = pageStatesEnumeration;

        $('#home-page-create-account-button').on('click', onNavigateToSignupPage);
        $('#home-page-sign-in-button').on('click', onNavigateToSigninPage);
    }
}


module.exports = HomePageController;