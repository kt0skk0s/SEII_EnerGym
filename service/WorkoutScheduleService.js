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
 * Returns the workout schedule of the user
 * FR21: The user must be able to view his/her workout schedule. 
 *
 * userID Long 
 * returns List
 **/
exports.getWorkoutSchedule = function(userID) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ "Workout1.pdf", "Workout2.pdf" ];
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
 * Delete a workout schedule for a user
 * FR4: The admin must remove an excisting workout schedule. 
 *
 * adminID String ID of the admin deleted a workout Schedule
 * groupExerciseId String ID of the workout schedule to be removed
 * no response value expected for this operation
 
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