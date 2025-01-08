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
      if(body && userId) {
        examples['application/json'] = {
          "Goal" : "Goal",
          "Surname" : "Surname",
          "Age" : 10,
          "email" : "mail@mail.com",
          "Weight" : 1,
          "Name" : "Name",
          "Mobilenumber" : 6
        };
      }

      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        reject();
      }
    });
  }