'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/ContractInformationService.js');

/**
 * Controller for managing Contract information
 * @module Contractinformation
 */

module.exports.userUserIdContractInformationGET = function userUserIdContractInformationGET(_, res, __, userId) {
  Default.userUserIdContractInformationGET(userId)
    .then(function (response) {
      utils.writeJson(res, response); // Επιστρέφει την απόκριση JSON
    })
    .catch(function (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal Server Error" }); // Σφάλμα
    });
};