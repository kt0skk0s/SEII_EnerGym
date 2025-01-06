'use strict';

var schedule = require('../mock/mockShedule.js'); // Import του mock schedule
var utils_Av = require('../utils/Availability.js');
var utils = require('../utils/writer.js');
var Default = require('../service/BookGroupExerciseService.js');

module.exports.userUserIdBookGroupExercisePOST = function userUserIdBookGroupExercisePOST (req, res, next, body, userId) {
    //console.log(JSON.stringify(schedule, null, 2));
    const x = utils_Av.isAvailable(schedule, body);
   // console.log("Availability Check Result:", x);
  
    if (x===false) { //ελεγχω αν εχω availability
      console.log("Slot is not available. Returning 400...");
      return utils.writeJson(res, { BookGroupExercise: false, message: "Choose another group exercise" }, 400);
    }

      Default.userUserIdBookGroupExercisePOST(body, userId)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    };