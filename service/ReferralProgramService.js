
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
  