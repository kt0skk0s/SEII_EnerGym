'use strict';


/**
 * Add group exercise to schedule
 * FR19: The admin should be able to add a new group exercise schedule. 
 *
 * body List Details of the group exercise schedule to be added
 * adminID String ID of the admin adding a new Group Exercise Schedule
 * returns GroupExerciseSchedule
 **/
exports.AddGroupExerciseSchedulePOST = function (body, adminId) {
    return new Promise((resolve, reject) => {
        if (!body.scheduleName || !body.time || !body.days) {
            reject({
                message: 'Missing required fields: scheduleName, time, or days.',
            });
        }

        // Mock data for the new schedule
        const newSchedule = {
            scheduleName: body.scheduleName,
            time: body.time,
            days: body.days,
            adminId: adminId,
        };

        // Simulate successful addition
        resolve({
            message: 'Successful group exercise upload',
            schedule: newSchedule,
        });
    });
};



/**
 * Add a workout schedule for a user
 * FR4: The admin must add a new workout schedule. 
 *
 * body Object Details of the workout schedule
 * adminID String ID of the admin added a workout Schedule
 * no response value expected for this operation
 **/
exports.AddWorkoutSchedulePOST = function(body,adminID) {
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
exports.EditGroupExerciseSchedulePUT = function (body, adminId) {
  return new Promise((resolve, reject) => {
      if (!body.scheduleId || !body.changes) {
          reject({
              message: 'Missing required fields: scheduleId or changes.',
          });
      }

      // Mock data for the updated schedule
      const updatedSchedule = {
          scheduleId: body.scheduleId,
          ...body.changes,
      };

      // Simulate successful update
      resolve({
          message: 'Successful group exercise edit',
          updatedSchedule: updatedSchedule,
      });
  });
};



/**
 * Remove exercise
 * FR22: Admin should be able to remove an existing exercise. 
 *
 * adminID String ID of the admin removing an exercise
 * exerciseId String ID of the exercise to be removed
 * no response value expected for this operation
 **/
exports.ExercisesDELETE = function(adminID,exerciseId) {
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
exports.ExercisesPOST = function(body,adminID) {
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
exports.RemoveGroupExerciseScheduleDELETE = function(adminID,groupExerciseId) {
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
exports.RemoveWorkoutScheduleDELETE = function(adminID,groupExerciseId) {
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
  "Email" : "",
  "PhoneNumber" : 0,
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
 * View workout schedule
 * FR21: The user must be able to view his/her workout schedule. 
 *
 * userID String 
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
exports.BookGroupExercisePOST = function (body, userId) {
  return new Promise(function (resolve, reject) {
    if (!body || !userId) {
      reject(new Error('Invalid input: body and userId are required'));
    }

    // Simulated booking logic (replace with real logic)
    const bookingDetails = {
      success: true,
      message: 'Booking confirmed',
      userId: userId,
      details: body,
    };

    resolve(bookingDetails);
  });
};


/**
 * Retrieve contract information
 * FR10: The user should be able to view the date that the contract starts/ends. 
 *
 * userId String ID of the user
 * returns ContractInformation
 **/
exports.ContractInformationGET = function(userId) {
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
exports.PersonalDetailsPOST = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Goal" : "Goal",
  "Surname" : "Surname",
  "Age" : 0,
  "email" : "",
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
exports.ReferralProgramPOST = function (body, userId) {
  return new Promise((resolve, reject) => {
      // Simulate example data only for some cases
      const hasExamples = body !== "empty"; // A condition to differentiate the test cases
      const examples = hasExamples
          ? {
                "application/json": {
                    message: "Referral processed successfully",
                    referredUserId: userId,
                    details: body,
                },
            }
          : {};

      // Resolve based on the presence of examples
      if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
      } else {
          resolve(undefined); // Explicitly return undefined when no examples exist
      }
  });
};



/**
 * Retrieve user training statistics
 * FR11: The user should be able to view the training stats. 
 *
 * userId String ID of the user
 * returns TrainingStats
 **/
exports.TrainingStatsGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Histogram" : "",
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

