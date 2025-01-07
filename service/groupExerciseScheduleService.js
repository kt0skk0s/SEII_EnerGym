/**
 * Add group exercise to schedule
 * FR19: The admin should be able to add a new group exercise schedule. 
 *
 * body List Details of the group exercise schedule to be added
 * adminID String ID of the admin adding a new Group Exercise Schedule
 * returns GroupExerciseSchedule
 **/


exports.adminAdminIDAddGroupExerciseSchedulePOST = function (body, adminID) {
    return new Promise(function (resolve, reject) {
      var examples = {};
      if(body && adminID) {
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
    }
    
      if (Object.keys(examples).length > 0) {
        resolve(examples['application/json']);
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
exports.adminAdminIDEditGroupExerciseSchedulePUT = function(body,adminID) {
    if(body,adminID){
      return new Promise(function(resolve, reject) {
        resolve();
      });
    }
  };
  
  

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