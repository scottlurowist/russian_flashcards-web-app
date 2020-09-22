'use strict'

let apiUrl
const apiUrls = {
  production: ' https://scottlurowist.github.io/russian_flashcards-web-app/',
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
