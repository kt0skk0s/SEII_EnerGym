// Constructor του ResponsePayload 
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Συνάρτηση για να επιστρέφει τα ορίσματα της ResponsePayload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  // έλεγχος αν η πρώτη παράμετρος ειναι ορισμένη και αν αποτελεί στιγμιότυπο της κλάσης
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }

  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}
