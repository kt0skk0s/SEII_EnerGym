'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/ContactInformationService.js');

module.exports.contactInformationGET = function contactInformationGET (req, res, next) {
  Default.contactInformationGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};