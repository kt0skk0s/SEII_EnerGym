'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/ReferralProgramService.js');

/**
 * Controller for managing Referral Program
 * @module ReferralProgram
 */

module.exports.userUserIdReferralProgramPOST = function userUserIdReferralProgramPOST (req, res, next, body, userId) {
  Default.userUserIdReferralProgramPOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};