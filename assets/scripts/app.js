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
const HomeViewController = require('./controllers/homeView');
const SignupViewController = require('./controllers/signupView');


$(() => {

  // Instantiate our pseudo-state machine that manages the details of 
  // displaying our application views.
  const ViewViewPseudoStateMachine = new ViewPseudoStateMachine();

  // Instantiate our view controllers, injecting our instance
  // of ViewPseudoStateMachine and viewStates. For views that require
  // an authenticated user, we also inject config and store, whose purposes
  // are described where they are imported.
  new HomeViewController(ViewViewPseudoStateMachine, viewStates);
  new SignupViewController(ViewViewPseudoStateMachine, viewStates, config, store);
})
