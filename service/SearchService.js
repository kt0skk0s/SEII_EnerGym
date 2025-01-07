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
      if (searchText || filter ) {
          examples['application/json'] = [ {
        "explanationVideo" : { },
        "exerciseImage" : "",
        "Title" : "Title"
      }, {
        "explanationVideo" : { },
        "exerciseImage" : "",
        "Title" : "Title"
      } ];

    }
    
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }
  