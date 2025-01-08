'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/PersonalDetailsService.js');

/**
 * Controller for managing Personal Details
 * @module PersonalDetails
 */

module.exports.userUserIdPersonalDetailsPOST = function userUserIdPersonalDetailsPOST (_, res, __, body, userId) {
  Default.userUserIdPersonalDetailsPOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};