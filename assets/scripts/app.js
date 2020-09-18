////////////////////////////////////////////////////////////////////////////////
// 
// app.js
//
// This file is the entry point for the Russian Flashcards app. It initializes
// each page controller and the viewPseudoStateMachine. It serves as the 
// "composition root" for dependency injection. This will promote the 
// "open-closed principle" and unit testability.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')


// Import our ViewPseudoStateMachine and pageStates. The former manages the 
// views in our SPA. The latter offers an enumeration for view controllers to
// signal their intent to the ViewPseudoStateMachine instance to transition to
// another view.
const {ViewPseudoStateMachine, pageStates} = require('./viewPseudoStateMachine');

// Import our view controllers for managing the details of each view in the app.
const HomePageController = require('./controllers/homePage');



$(() => {

  // Instantiate our pseudo-state machine that manages the details of 
  // displaying our application pages.
  const ViewViewPseudoStateMachine = new ViewPseudoStateMachine();

  // Instantiate our page controllers, injecting our instance
  // of ViewPseudoStateMachine and pageStates.
  new HomePageController(ViewViewPseudoStateMachine, pageStates);
})
