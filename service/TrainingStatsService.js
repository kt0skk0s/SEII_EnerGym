/**
 * Retrieve user training statistics
 * FR11: The user should be able to view the training stats. 
 *
 * userId String ID of the user
 * returns TrainingStats
 **/
exports.userUserIdTrainingStatsGET = function(userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
    "Histogram" : "H",
    "TimesPerMonth" : 6,
    "AverageTime" : 4
  };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }