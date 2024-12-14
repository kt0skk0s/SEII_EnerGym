'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.adminAdminIDAddGroupExerciseSchedulePOST = function adminAdminIDAddGroupExerciseSchedulePOST (req, res, next, body, adminID) {
  Default.adminAdminIDAddGroupExerciseSchedulePOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDAddWorkoutSchedulePOST = function adminAdminIDAddWorkoutSchedulePOST (req, res, next, body, adminID) {
  Default.adminAdminIDAddWorkoutSchedulePOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDEditGroupExerciseSchedulePUT = function adminAdminIDEditGroupExerciseSchedulePUT (req, res, next, body, adminID) {
  Default.adminAdminIDEditGroupExerciseSchedulePUT(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDExercisesDELETE = function adminAdminIDExercisesDELETE (req, res, next, adminID, exerciseId) {
  Default.adminAdminIDExercisesDELETE(adminID, exerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDExercisesPOST = function adminAdminIDExercisesPOST (req, res, next, body, adminID) {
  Default.adminAdminIDExercisesPOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDRemoveGroupExerciseScheduleDELETE = function adminAdminIDRemoveGroupExerciseScheduleDELETE (req, res, next, adminID, groupExerciseId) {
  Default.adminAdminIDRemoveGroupExerciseScheduleDELETE(adminID, groupExerciseId)
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

module.exports.contactInformationGET = function contactInformationGET (req, res, next) {
  Default.contactInformationGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eshopGET = function eshopGET (req, res, next) {
  Default.eshopGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllExercises = function getAllExercises (req, res, next, searchText, filter) {
  Default.getAllExercises(searchText, filter)
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

module.exports.liveCapacityPUT = function liveCapacityPUT (req, res, next, body) {
  Default.liveCapacityPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIdBookGroupExercisePOST = function userUserIdBookGroupExercisePOST (req, res, next, body, userId) {
  Default.userUserIdBookGroupExercisePOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.userUserIdContractInformationGET = function userUserIdContractInformationGET(req, res, next, userId) {
  Default.userUserIdContractInformationGET(userId)
    .then(function (response) {
      utils.writeJson(res, response); // Επιστρέφει την απόκριση JSON
    })
    .catch(function (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal Server Error" }); // Σφάλμα
    });
};


  

/*
module.exports.userUserIdContractInformationGET = function userUserIdContractInformationGET (req, res, next, userId) {
  Default.userUserIdContractInformationGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
*/
module.exports.userUserIdPersonalDetailsPOST = function userUserIdPersonalDetailsPOST (req, res, next, body, userId) {
  Default.userUserIdPersonalDetailsPOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIdReferralProgramPOST = function userUserIdReferralProgramPOST (req, res, next, body, userId) {
  Default.userUserIdReferralProgramPOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIdTrainingStatsGET = function userUserIdTrainingStatsGET (req, res, next, userId) {
  Default.userUserIdTrainingStatsGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
