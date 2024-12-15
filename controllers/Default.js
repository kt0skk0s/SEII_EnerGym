'use strict';

var utils_Av = require('../utils/Availability.js');
var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');
var schedule = require('../mock/mockShedule.js'); // Import του mock schedule

module.exports.adminAdminIDAddGroupExerciseSchedulePOST = function adminAdminIDAddGroupExerciseSchedulePOST (req, res, next, body, adminID) {

  if (
    !Array.isArray(body) || // Πρέπει να είναι πίνακας
    body.length !== 5 || // Πρέπει να έχει 5 ημέρες
    !body.every(day => Array.isArray(day) && day.length === 8) // Κάθε ημέρα πρέπει να έχει 8 slots (ωρες)
  ) {

    return utils.writeJson(res, {
      statusCode: 400, 
      message: 'Invalid schedule format. Expected a 5x8 matrix.',
    }, 400);
  }

  Default.adminAdminIDAddGroupExerciseSchedulePOST(body, adminID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminAdminIDAddWorkoutSchedulePOST = function adminAdminIDAddWorkoutSchedulePOST (req, res, next, body, adminID) {

  if (!body || typeof body.WorkoutSchedule !== "string" || body.WorkoutSchedule === undefined ) {
    return utils.writeJson(res, { message: "WorkoutSchedule must be a string" }, 400);
  }

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
  //console.log(JSON.stringify(schedule, null, 2));
  const x = utils_Av.isAvailable(schedule, body);
 // console.log("Availability Check Result:", x);

  if (x===false) { //ελεγχω αν εχω availability
    console.log("Slot is not available. Returning 400...");
    return utils.writeJson(res, { BookGroupExercise: false, message: "Choose another group exercise" }, 400);
  }
  
  

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
