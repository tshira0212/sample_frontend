// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder
  }
  
  if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = require('util').TextDecoder
  }

  const fetchPolifill = require('whatwg-fetch')

  global.fetch = fetchPolifill.fetch
  global.Request = fetchPolifill.Request
  global.Headers = fetchPolifill.Headers
  global.Response = fetchPolifill.Response