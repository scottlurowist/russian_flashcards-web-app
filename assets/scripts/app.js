////////////////////////////////////////////////////////////////////////////////
// 
// app.js
//
// This file is the entry point for the Russian Flashcards app. It initializes
// each view controller and the viewPseudoStateMachine. It serves as the 
// "composition root" for dependency injection. This will promote the 
// "open-closed principle" and unit testability.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// Import the configuration module which manages devand production URLs
// for us. The store is just an object to which we can store information such
// as an authenticated user.
const config = require('./config');
const store = require('./store');


// Import our ViewPseudoStateMachine and viewStates. The former manages the 
// views in our SPA. The latter offers an enumeration for view controllers to
// signal their intent to the ViewPseudoStateMachine instance to transition to
// another view.
const {ViewPseudoStateMachine, viewStates} = require('./viewPseudoStateMachine');

// Import our view controllers for managing the details of each view in the app.
const ChangePasswordViewController = require('./controllers/changePasswordView');
const CreateFlashcardViewController = require('./controllers/createFlashcardView');
const CyrillicKeyboardViewController = require('./controllers/cyrillicKeyboardView');
const FlashcardOptionsViewController = require('./controllers/flashcardsOptionsView');
const HomeViewController = require('./controllers/homeView');
const SigninViewController = require('./controllers/signinView');
const SignupViewController = require('./controllers/signupView');
const StatusMessageViewController = require('./controllers/statusMessageView');




$(() => {

  // The dependencies that we inject into each controller. Each controller
  // decides what it needs, and this keeps things loosely-coupled.
  const injectables = {
    config,
    cyrillicKeyboardView: new CyrillicKeyboardViewController(),
    // This class decouples how we display messages from the other controllers.
    // This allows us to change how we display messages at will.
    statusMessageView: new StatusMessageViewController(),
    store,
    viewStates,
    // Instantiate our pseudo-state machine that manages the details of 
    // displaying our application views.    
    viewPseudoStateMachine: new ViewPseudoStateMachine()
  }

  // Instantiate our view controllers, injecting our injectables. Let each
  // controller decide what it needs. This keeps things loosely-coupled and
  // reduces maintenance.
  new ChangePasswordViewController(injectables);
  new CreateFlashcardViewController(injectables);
  new FlashcardOptionsViewController(injectables);
  new HomeViewController(injectables);
  new SigninViewController(injectables);
  new SignupViewController(injectables);
})
