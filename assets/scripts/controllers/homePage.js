////////////////////////////////////////////////////////////////////////////////
// 
// homePage.js
//
// This file acts as an MVC controller for the home page. It simply delegates
// button clicks to the viewPseudoStateMachine.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


const { pageStates } = require('./../viewPseudoStateMachine');
const viewPseudoStateMachine = require('./../viewPseudoStateMachine');


// Signals the home page's intent to the viewPseudoStateMachine to navigate
// to the signup page. The viewPseudoStateMachine worries about the details
// of displaying the signup page.
const onNavigateToSignupPage = () => {

    viewPseudoStateMachine.transitionToState(pageStates.signUpPage);
};


// Initializes the controller. It registers handlers for DOM events that
// are of interest to this controller.
const initialize = () => {

    $('#home-page-create-account-button').on('click', onNavigateToSignupPage);
};


module.exports = {
    initialize
};