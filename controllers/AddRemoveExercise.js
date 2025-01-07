'use strict';

var utils = require('../utils/writer.js');
var AddRemoveExercise = require('../service/AddRemoveExerciseService.js');

/**
 * Controller for managing Exercises
 * @module AddRemoveExercise
 */

module.exports.adminAdminIDExercisesDELETE = function adminAdminIDExercisesDELETE (_, res, _, adminID, exerciseId) {
    AddRemoveExercise.adminAdminIDExercisesDELETE(adminID, exerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDExercisesPOST = function adminAdminIDExercisesPOST (_, res, _, body, adminID) {
    AddRemoveExercise.adminAdminIDExercisesPOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};