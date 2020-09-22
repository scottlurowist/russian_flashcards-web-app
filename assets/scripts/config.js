'use strict'

let apiUrl
const apiUrls = {
  production: 'https://russian-flashcards-webapi.herokuapp.comgit cm',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
