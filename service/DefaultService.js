'use strict';


/**
 * Add group exercise to schedule
 * FR19: The admin should be able to add a new group exercise schedule. 
 *
 * body List Details of the group exercise schedule to be added
 * adminID String ID of the admin adding a new Group Exercise Schedule
 * returns GroupExerciseSchedule
 **/
<<<<<<< HEAD
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

=======


exports.adminAdminIDAddGroupExerciseSchedulePOST = function (body, adminID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    
    // Δημιουργούμε έναν πίνακα 5x8
    examples['application/json'] = Array.from({ length: 5 }, (_, dayIndex) => {
      return Array.from({ length: 8 }, (_, hourIndex) => {
        return {
          Name: `Exercise ${dayIndex + 1}-${hourIndex + 1}`,
          Date: `2024-12-${16 + dayIndex}`,
          Time: `${8 + hourIndex}:00`,
          Availability: Math.random() > 0.5, // Τυχαία διαθεσιμότητα true/false
        };
      });
    });
  
    if (Object.keys(examples).length > 0) {
      resolve(examples['application/json']);
    } else {
      resolve();
    }
  });
}
>>>>>>> ioannidisg




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

    var examples = {};
    examples['application/json'] = {
      "WorkoutSchedule" : "WorkoutSchedule.pdf",
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
<<<<<<< HEAD
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
=======
exports.adminAdminIDEditGroupExerciseSchedulePUT = function(body,adminID) {
  return new Promise(function(resolve, reject) {
    resolve();
>>>>>>> ioannidisg
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
exports.adminAdminIDExercisesDELETE = function (adminID, exerciseName, exerciseList) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(exerciseList)) {
      return reject({ statusCode: 400, message: "Invalid exercise list provided" });
    }

    const index = exerciseList.findIndex((exercise) => exercise.Title === exerciseName);

    if (index !== -1) {
      exerciseList.splice(index, 1); // Αφαίρεση από τη λίστα
      return resolve({ message: `Exercise '${exerciseName}' deleted successfully` });
    } else {
      return reject({ statusCode: 404, message: `Exercise '${exerciseName}' not found` });
    }
  });
};




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
  "explanationVideo" : {            
     duration: "1 min",
     videoURL: "https://www.exercise",
     thumbnail: "image"},
  "exerciseImage" : "image",
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
exports.adminAdminIDRemoveGroupExerciseScheduleDELETE = function(adminID,groupExerciseScedule) {
  
  return new Promise(function(resolve, reject) {
    groupExerciseScedule = Array.from({ length: 5 }, () =>
      Array.from({ length: 8 }, () => ({ Name: null, Date: null, Time: null, Availability: null }))
    );

    resolve(groupExerciseScedule);
  });
}


/**
 * Delete a workout schedule for a user
 * FR4: The admin must remove an excisting workout schedule. 
 *
 * adminID String ID of the admin deleted a workout Schedule
 * groupExerciseId String ID of the workout schedule to be removed
 * no response value expected for this operation
 *
exports.adminAdminIDRemoveWorkoutScheduleDELETE = function(adminID,Workout) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}
*/

exports.adminAdminIDRemoveWorkoutScheduleDELETE = function (workoutToDelete, workoutSchedules) {
  return new Promise(function (resolve, reject) {
    // Έλεγχος αν η λίστα είναι έγκυρη
    if (!Array.isArray(workoutSchedules)) {
      return reject({ statusCode: 400, message: "Invalid workout schedule list provided" });
    }

    // Βρες τη θέση του προγράμματος στη λίστα
    const index = workoutSchedules.findIndex((workout) => workout === workoutToDelete);

    // Αν υπάρχει το πρόγραμμα, διαγράφεται
    if (index !== -1) {
      workoutSchedules.splice(index, 1); // Αφαίρεση από τη λίστα
      return resolve({ message: `Workout '${workoutToDelete}' deleted successfully` });
    } else {
      // Αν το πρόγραμμα δεν βρέθηκε
      return reject({ statusCode: 404, message: `Workout '${workoutToDelete}' not found` });
    }
  });
};


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
<<<<<<< HEAD
    resolve();
=======
    var examples = {};
    examples['application/json'] = [ "Workout1.pdf", "Workout2.pdf" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
>>>>>>> ioannidisg
  });
}


/**
 * Update live gym capacity
 * FR7: The user should be able to know how many people are in the gym. 
 *
 * body Integer Number of people in the gym
 * returns LiveCapacity
 **/
exports.liveCapacityPUT = function(x,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = x;
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
<<<<<<< HEAD
exports.BookGroupExercisePOST = function (body, userId) {
  return new Promise(function (resolve, reject) {
    if (!body || !userId) {
      reject(new Error('Invalid input: body and userId are required'));
=======
exports.userUserIdBookGroupExercisePOST = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "name": "Yoga",
      "date": "2024-12-20",
      "time": "10:00"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
>>>>>>> ioannidisg
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
  "Age" : 10,
  "email" : "mail@mail.com",
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
  //console.log("Request Body:", req.body); // Καταγραφή του σώματος του αιτήματος
  //console.log("Request Params:", req.params); // Καταγραφή των παραμέτρων του αιτήματος

  
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] =  {
      "referralCode": "REF159"
  }
    ;
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
  "Histogram" : "H",
  "TimesPerMonth" : 6,
  "AverageTime" : 4
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
