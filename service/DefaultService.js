'use strict';


/**
 * Add group exercise to schedule
 * FR19: The admin should be able to add a new group exercise schedule. 
 *
 * body List Details of the group exercise schedule to be added
 * adminID String ID of the admin adding a new Group Exercise Schedule
 * returns GroupExerciseSchedule
 **/
exports.adminAdminIDAddGroupExerciseSchedulePOST = function(body,adminID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "GroupExercise" : { }
}, {
  "GroupExercise" : { }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a workout schedule for a user
 * FR4: The admin must add a new workout schedule. 
 *
 * body Object Details of the workout schedule
 * adminID String ID of the admin added a workout Schedule
 * no response value expected for this operation
 **/
exports.adminAdminIDAddWorkoutSchedulePOST = function(body,adminID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit group exercise in schedule
 * FR19: The admin should be able to edit a group exercise schedule. 
 *
 * body GroupExercise 
 * adminID String ID of the admin editing a Group Exercise Schedule
 * no response value expected for this operation
 **/
exports.adminAdminIDEditGroupExerciseSchedulePUT = function(body,adminID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Remove exercise
 * FR22: Admin should be able to remove an existing exercise. 
 *
 * adminID String ID of the admin removing an exercise
 * exerciseId String ID of the exercise to be removed
 * no response value expected for this operation
 **/
exports.adminAdminIDExercisesDELETE = function(adminID,exerciseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Add new exercise
 * FR22: Admin should be able to add a new exercise. 
 *
 * body Exercise Details of the new exercise
 * adminID String ID of the admin adding a new exercise
 * returns Exercise
 **/
exports.adminAdminIDExercisesPOST = function(body,adminID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "explanationVideo" : { },
  "exerciseImage" : "",
  "Title" : "Title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Remove group exercise from schedule
 * FR19: The admin should be able to remove an excisting group exercise schedule. 
 *
 * adminID String ID of the admin removing a Group Exercise Schedule
 * groupExerciseId String ID of the group exercise to be removed
 * no response value expected for this operation
 **/
exports.adminAdminIDRemoveGroupExerciseScheduleDELETE = function(adminID,groupExerciseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a workout schedule for a user
 * FR4: The admin must remove an excisting workout schedule. 
 *
 * adminID String ID of the admin deleted a workout Schedule
 * groupExerciseId String ID of the workout schedule to be removed
 * no response value expected for this operation
 **/
exports.adminAdminIDRemoveWorkoutScheduleDELETE = function(adminID,groupExerciseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve gym's contact details
 * FR9: The user must be able to access contact details. 
 *
 * returns ContactInformation
 **/
exports.contactInformationGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Email" : "contact@info.com",
  "PhoneNumber" : 1,
  "PhysicalAddress" : "PhysicalAddress"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Access gym's e-shop
 * FR12: The user should have access to gym's e-shop. 
 *
 * returns Eshop
 **/
exports.eshopGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "http://example.com/aeiou";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns all exercises
 * FR20: The user must be able to view all the exercises.  FR5: The user must be able to search for exercises. 
 *
 * searchText String  (optional)
 * filter List  (optional)
 * returns List
 **/
exports.getAllExercises = function(searchText,filter) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "explanationVideo" : { },
  "exerciseImage" : "",
  "Title" : "Title"
}, {
  "explanationVideo" : { },
  "exerciseImage" : "",
  "Title" : "Title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the workout schedule of the user
 * FR21: The user must be able to view his/her workout schedule. 
 *
 * userID Long 
 * returns List
 **/
exports.getWorkoutSchedule = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update live gym capacity
 * FR7: The user should be able to know how many people are in the gym. 
 *
 * body Integer Number of people in the gym
 * returns LiveCapacity
 **/
exports.liveCapacityPUT = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = 0;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Book a group exercise
 * FR6: The user should be able to book a group exercise. 
 *
 * body Boolean Details of the group exercise to be booked
 * userId String ID of the user booking the exercise
 * returns BookGroupExercise
 **/
exports.userUserIdBookGroupExercisePOST = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = true;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve contract information
 * FR10: The user should be able to view the date that the contract starts/ends. 
 *
 * userId String ID of the user
 * returns ContractInformation
 **/
exports.userUserIdContractInformationGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "endingDate" : "2000-01-23",
  "PastContracts" : [ {
    "endingDate" : "2000-01-23",
    "startingDate" : "2000-01-23"
  }, {
    "endingDate" : "2000-01-23",
    "startingDate" : "2000-01-23"
  } ],
  "startingDate" : "2000-01-23"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User provides personal details
 * FR2: The user must give his/her personal details. FR3: The user must inform  about his/her goal. 
 *
 * body PersonalDetails Personal details of the user
 * userId String ID of the user
 * returns PersonalDetails
 **/
exports.userUserIdPersonalDetailsPOST = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Goal" : "Goal",
  "Surname" : "Surname",
  "Age" : 7,
  "email" : "user@email.com",
  "Weight" : 1,
  "Name" : "Name",
  "Mobilenumber" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Invite new members
 * FR17: The user should be able to invite new members. 
 *
 * body String Details of the member to be invited
 * userId String ID of the user inviting new members
 * returns ReferralProgram
 **/
exports.userUserIdReferralProgramPOST = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve user training statistics
 * FR11: The user should be able to view the training stats. 
 *
 * userId String ID of the user
 * returns TrainingStats
 **/
exports.userUserIdTrainingStatsGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Histogram" : "niovi",
  "TimesPerMonth" : 6,
  "AverageTime" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
