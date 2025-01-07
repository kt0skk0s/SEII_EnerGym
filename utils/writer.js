// Constructor του ResponsePayload
class ResponsePayload {
  constructor(code, payload) {
    this.code = code;
    this.payload = payload;
  }
}

// Συνάρτηση για να επιστρέφει τα ορίσματα της ResponsePayload
exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

// Συνάρτηση για τον response κώδικα
function determineResponseCode(arg1, arg2) {
  if (arg2 && Number.isInteger(arg2)) return arg2;
  if (arg1 && Number.isInteger(arg1)) return arg1;
  return 200; // Default response code
}

// Συνάρτηση για το payload
function determinePayload(arg1) {
  return arg1 && typeof arg1 === 'object' ? JSON.stringify(arg1, null, 2) : arg1;
}


exports.writeJson = function (response, arg1, arg2) {
  if (arg1 instanceof ResponsePayload) {
    return exports.writeJson(response, arg1.payload, arg1.code);
  }

  const code = determineResponseCode(arg1, arg2);
  const payload = determinePayload(arg1);

  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
};

