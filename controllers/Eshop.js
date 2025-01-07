'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/EshopService.js');

/**
 * Controller for managing Eshop
 * @module Eshop
 */

module.exports.eshopGET = function eshopGET (_, res, _) {
  Default.eshopGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

