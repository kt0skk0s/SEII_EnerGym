'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/EshopService.js');

module.exports.eshopGET = function eshopGET (req, res, next) {
  Default.eshopGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

