/**
 * Access gym's e-shop
 * FR12: The user should have access to gym's e-shop. 
 *
 * returns Eshop
 **/
exports.eshopGET = function() {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = "http://example.com/aeiou";
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        reject();
      }
    });
  }