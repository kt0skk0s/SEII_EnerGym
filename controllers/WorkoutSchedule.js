'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/WorkoutScheduleService.js');

/**
 * Controller for managing Workout Schedules
 * @module WorkoutSchedule
 */

module.exports.adminAdminIDAddWorkoutSchedulePOST = function adminAdminIDAddWorkoutSchedulePOST (_, res, _, body, adminID) {

  if (!body || typeof body.WorkoutSchedule !== "string" || body.WorkoutSchedule === undefined ) {
    return utils.writeJson(res, { message: "WorkoutSchedule must be a string" }, 400);
  }

  Default.adminAdminIDAddWorkoutSchedulePOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.getWorkoutSchedule = function getWorkoutSchedule (req, res, next, userID) {
  Default.getWorkoutSchedule(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDRemoveWorkoutScheduleDELETE = function adminAdminIDRemoveWorkoutScheduleDELETE (req, res, next, adminID, groupExerciseId) {
  Default.adminAdminIDRemoveWorkoutScheduleDELETE(adminID, groupExerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

