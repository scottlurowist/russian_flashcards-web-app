////////////////////////////////////////////////////////////////////////////////
// 
// app.js
//
// This file is the entry point for the Russian Flashcards app. It initializes
// each page controller and the viewPseudoStateMachine.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')


const homePageController = require('./controllers/homePage');
const viewPseudoStateMachine = require('./viewPseudoStateMachine')


$(() => {

  // Initialize our pseudo state machine that manages the details of 
  // displaying our application pages.
  viewPseudoStateMachine.initialize();

  // Initialize our page controllers.
  homePageController.initialize();
})
