'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/groupExerciseScheduleService.js');

/**
 * Controller for managing Group Exercise Shedules
 * @module groupExerciseShedule
 */

module.exports.adminAdminIDAddGroupExerciseSchedulePOST = function adminAdminIDAddGroupExerciseSchedulePOST (_, res, __, body, adminID) {

  if (
    !Array.isArray(body) || // Πρέπει να είναι πίνακας
    body.length !== 5 || // Πρέπει να έχει 5 ημέρες
    !body.every(day => Array.isArray(day) && day.length === 8) // Κάθε ημέρα πρέπει να έχει 8 slots (ωρες)
  ) {

    return utils.writeJson(res, {
      statusCode: 400, 
      message: 'Invalid schedule format. Expected a 5x8 matrix.',
    }, 400);
  }

  Default.adminAdminIDAddGroupExerciseSchedulePOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.adminAdminIDEditGroupExerciseSchedulePUT = function adminAdminIDEditGroupExerciseSchedulePUT (_, res, __, body, adminID) {
  Default.adminAdminIDEditGroupExerciseSchedulePUT(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDRemoveGroupExerciseScheduleDELETE = function adminAdminIDRemoveGroupExerciseScheduleDELETE (_, res, __, adminID, groupExerciseId) {
  Default.adminAdminIDRemoveGroupExerciseScheduleDELETE(adminID, groupExerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};