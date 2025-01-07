/**
 * Update live gym capacity
 * FR7: The user should be able to know how many people are in the gym. 
 *
 * body Integer Number of people in the gym
 * returns LiveCapacity
 **/
exports.liveCapacityPUT = function(body) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = body;
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }