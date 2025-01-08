'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/SearchService.js');

/**
 * Controller for managing Search
 * @module Search
 */

module.exports.getAllExercises = function getAllExercises (_, res, __, searchText, filter) {
  Default.getAllExercises(searchText, filter)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};