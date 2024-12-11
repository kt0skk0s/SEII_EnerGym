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


/*
module.exports.getAllExercises = function getAllExercises (req, res, next, searchText, filter) {
  return Default.getAllExercises(searchText, filter)
    .then(function (response) {
      utils.writeJson(res, response);
      return response;  // Επιστρέφει την απόκριση για εξωτερική χρήση
    })
    .catch(function (error) {
      utils.writeJson(res, error);
      throw error;  // Πετάει το λάθος προς τα έξω, αν χρειάζεται να χειριστείς το λάθος εκτός
    });
};
*/

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

module.exports.userUserIdBookGroupExercisePOST = function userUserIdBookGroupExercisePOST (req, res, next, body, userId) {
  Default.userUserIdBookGroupExercisePOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIdContractInformationGET = function userUserIdContractInformationGET (req, res, next, userId) {
  Default.userUserIdContractInformationGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
