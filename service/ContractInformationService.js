'use strict'

/**
 * Retrieve contract information
 * FR10: The user should be able to view the date that the contract starts/ends. 
 *
 * userId String ID of the user
 * returns ContractInformation
 **/
exports.userUserIdContractInformationGET = function(userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      if (userId) {
      examples['application/json'] = {
    "endingDate" : "2000-01-23",
    "PastContracts" : [ {
      "endingDate" : "2000-01-23",
      "startingDate" : "2000-01-23"
    }, {
      "endingDate" : "2000-01-23",
      "startingDate" : "2000-01-23"
    } ],
    "startingDate" : "2000-01-23"
   };
  }
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }