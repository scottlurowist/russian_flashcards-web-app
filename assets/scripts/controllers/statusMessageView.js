////////////////////////////////////////////////////////////////////////////////
// 
// statusMessageView.js
//
// This file acts as an MVC controller for the status message display view. I
//
////////////////////////////////////////////////////////////////////////////////


'use strict'



// Cache the status message area element's jQuery selectors so that we only
//  have to query the DOM once for it.
const statusMessageDisplayArea =  $('#status-notification-message-area');


// An ES6 class that acts as a controller for the status message display view.
// All status message display view functionality is encaspsulated by this class.
//
// to use:
// new StatusMessageViewController
//
class StatusMessageViewController {

    constructor() { }


    // Dislays a message to the display area. This controller is the only
    // controller that knows the details of displaying messages.
    //          
    // message - The message to be displayed.
    //
    // statusMessageType - TBD. This will style messages as info, error, etc.
    //
    displayMessage(message, statusMessageType) {

        statusMessageDisplayArea.text(message);
    };
}


module.exports = StatusMessageViewController;