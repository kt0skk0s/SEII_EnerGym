'use strict'

/**
 * Book a group exercise
 * FR6: The user should be able to book a group exercise. 
 *
 * body Boolean Details of the group exercise to be booked
 * userId String ID of the user booking the exercise
 * returns BookGroupExercise
 **/
exports.userUserIdBookGroupExercisePOST = function(body,userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
        "name": "Yoga",
        "date": "2024-12-20",
        "time": "10:00"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
  
    });
  };
  