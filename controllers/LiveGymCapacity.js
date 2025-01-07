'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/LiveGymCapacityService.js');

/**
 * Controller for managing Live Gym's Capacity
 * @module LiveGymCapacity
 */

module.exports.liveCapacityPUT = function liveCapacityPUT (_, res, _, body) {

  if (!body || body.liveCapacity === undefined) {
    return utils.writeJson(res, { error: 'liveCapacity is required' }, 400);
  }

  // Έλεγχος αν το liveCapacity είναι μικρότερο από 0
  if (body.liveCapacity < 0) {
    return utils.writeJson(res, { error: 'liveCapacity must be a positive number' }, 400);
  }
  
  Default.liveCapacityPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};