'use strict'
/**
 * Add group exercise to schedule
 * FR19: The admin should be able to add a new group exercise schedule. 
 *
 * body List Details of the group exercise schedule to be added
 * adminID String ID of the admin adding a new Group Exercise Schedule
 * returns GroupExerciseSchedule
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