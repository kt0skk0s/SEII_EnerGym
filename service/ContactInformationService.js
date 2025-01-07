'use strict'

/**
 * Retrieve gym's contact details
 * FR9: The user must be able to access contact details. 
 *
 * returns ContactInformation
 **/
exports.contactInformationGET = function() {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
        "Email" : "contact@info.com",
        "PhoneNumber" : 1,
        "PhysicalAddress" : "PhysicalAddress"
  };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }