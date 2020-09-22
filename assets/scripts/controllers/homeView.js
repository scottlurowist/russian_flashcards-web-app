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
let viewPseudoStateMachine;

// An enumeration of the next view to which we must transition.
let viewStates;


// Cache the various form element's jQuery selectors so that we only have to 
// query the DOM once for these selectors.
const homeView = $('#home-view')




// Signals the home views's intent to the viewPseudoStateMachine to navigate
// to the signup view. The viewPseudoStateMachine worries about the details
// of displaying the signup view.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const onNavigateToSignupView = () => {

    viewPseudoStateMachine.transitionToState(viewStates.signUpView);
};


// Signals the home views's intent to the viewPseudoStateMachine to navigate
// to the signin view. The viewPseudoStateMachine worries about the details
// of displaying the signin view.
//
// This function is invoked from the contoller class and is not defined 
// inside of it. This allows this function to remain private as in 
// true object-oriented languages.
const onNavigateToSigninView = () => {

    viewPseudoStateMachine.transitionToState(viewStates.signInView);
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
    // injectables - Contains all of the dependencies that this controller
    //               might need.
    //         
    constructor(injectables) {
        
        // These are module variables so as to keep the private methods
        // truly private, since those private functions use these variables.
        viewPseudoStateMachine = injectables.viewPseudoStateMachine;
        viewStates = injectables.viewStates;
        
        // We only need to display a single message, so don't save this to a 
        // variable.
        injectables.statusMessageView
                   .displayMessage('Welcome to Russian Flashcards / ' +
                                   'добро пожаловать в карточки на русском');

        $('#home-view-create-account-button').on('click', onNavigateToSignupView);
        $('#home-view-sign-in-button').on('click', onNavigateToSigninView);

        // Register the view with the ViewPseudoStateMachine. It
        // will show views when asked, and the view to be shown will 
        // have its form elements reset.
        viewPseudoStateMachine.registerView(viewStates.homeView, homeView);        
    }
}


module.exports = HomeViewController;