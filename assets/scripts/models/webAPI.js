////////////////////////////////////////////////////////////////////////////////
// 
// flashcards.js
//
// This file acts as a model for flashcards in an MVC architecture. It invokes
// web services in a generic manner, freeing controllers from knowing the 
// details of how to invoke web services, ad allows us to feely change how we
// invoke web services.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


//An instance of a GA provided module that manages dev and production
// URLs for us.
let config;


// An ES6 class that acts as a model for web serives in an MVC architecture.
//
class WebAPIModel {

    // config - Contains configuration for the scheme, hostname, and port
    //          number for the web services.
    //         
    constructor(config) {
        
        this.configuration = config;
    }


    // Invokes a web service in a generic manner.
    //
    // resource - The resource of interest, such as /people, /books, etc.
    // httpVerb - An httpVerb, such as GET, PUT, PATCH, DELETE.
    // data     - Any data that might be passed to the web serive.
    // token - An optional token for web service calls that require a token.
    // resourceId - An id to a RESTful resource.
    //
    // RETURNS - A promise to the model.
    //
    invokeService(resource, httpVerb, data = null, token = null,
                  resourceId = null ) {

        // Loosely follow the Gang of Four Builder pattern in order
        // to construct the arguments for our AJAX call. We 
        // don't need to check and validate the arguments since this
        // is a private API; if there are errors, then fix them.
        const args = {};

        args.url = this.configuration.apiUrl + resource;
        args.method = httpVerb;

        if (resourceId) args.url += "/" + resourceId;

        if (token) args.headers = {'Authorization': `Bearer ${token}`};

        if (data) args.data = data;

        // Return the promise for the AJAX call.
        return $.ajax(args);
    }
}


module.exports = WebAPIModel;
