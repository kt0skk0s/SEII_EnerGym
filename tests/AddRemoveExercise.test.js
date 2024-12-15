const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index.js');
const { adminAdminIDExercisesPOST, adminAdminIDExercisesDELETE } = require('../service/DefaultService.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({
        prefixUrl: t.context.prefixUrl,
        throwHttpErrors: false,
    });
});

test.after.always((t) => {
    t.context.server.close();
});

//se allo test na elegjo an bgazei tin idia askisi

  let AllExercises = [];

  const newExercise = {
    Title: 'Bench Press',
    exerciseImage: 'https://workoutlabs.com/train/svg.php?id=84755',
    explanationVideo: {
        duration: "2:56 minutes",
        videoURL: "https://www.youtube.com/watch?v=gRVjAtPip0Y&ab_channel=BuffDudes",
        thumbnail: "https://workoutlabs.com/train/svg.php?id=84755"
    }, 

};

const incompleteExercise = {
    exerciseImage: "http://example.com/exercise.jpg" // λειπουν δεδομενα
  };


test('POST /admin/{AdminID}/exercises should return appropriate JSON format', async (t) => {
    const adminID = 123;
    const response = await t.context.got.post(`admin/${adminID}/exercises`, {
        json: newExercise,
    });

    t.is(response.statusCode, 200, );
    
   t.true(newExercise.exerciseImage.startsWith('https://'), 'Exercise image should be a valid URL');
    
    t.is(AllExercises.length,0); // Έχω 0 ασκήσεις

    if (response.statusCode === 200){
      AllExercises.push(newExercise);
    }

    t.is(AllExercises.length,1);  // Ελέγχω ότι προστέθηκε η άσκηση length > 1

    t.truthy(newExercise.Title, 'Title should be "New Exercise"');
    t.truthy(newExercise.exerciseImage, 'exerciseImage should be present');
    t.truthy(newExercise.explanationVideo.duration, 'Explanation video duration should be present');
    t.truthy(newExercise.explanationVideo.videoURL, 'Explanation video videoURL should be present');
    t.truthy(newExercise.explanationVideo.thumbnail, 'Explanation video thumbnail should be present');
    t.is(typeof newExercise.Title, 'string');
    t.is(typeof newExercise.exerciseImage, 'string');
    t.is(typeof newExercise.explanationVideo.duration, 'string');
    t.is(typeof newExercise.explanationVideo.videoURL, 'string');
    t.is(typeof newExercise.explanationVideo.thumbnail, 'string');
    
});


// Test case for adding an exercise with missing required fields
test("POST /admin/{AdminID}/exercises should return an error when required fields are missing", async (t) => {
  const adminID = 123;
  
  const response = await t.context.got.post(`admin/${adminID}/exercises`, {
    json: incompleteExercise,
    throwHttpErrors: false
  });

  if (response.statusCode === 200){
    AllExercises.push(incompleteExercise);
  }
  console.log(AllExercises);

  t.is(response.statusCode, 400, "Should return HTTP 400 for missing required fields");
  //t.deepEqual(response.body, { error: "Title and explanation video are required" }, "Error message should indicate missing fields");
});


// Test case for deleting an exercise

/*
test('DELETE /admin/{AdminID}/exercises should return HTTP 200 when removing an exercise', async (t) => {
    const adminID = 123;
    const Exe = [];
    const exerciseToDelete = 'Bench Press';
    Exe.push(exerciseToDelete);

    const response = await t.context.got.delete(`admin/${adminID}/exercises`);
    const a = adminAdminIDExercisesDELETE(exerciseToDelete,Exe);
    
    console.log('delete',Exe);
    t.is(Exe.length,0); // Έχω 0 ασκήσεις

    
    //t.is(response.statusCode, 200, 'Should return HTTP 200 when removing an exercise');
});
*/
test('DELETE /admin/{AdminID}/exercises should remove an exercise from the specified list', async (t) => {
  const adminID = 123; 
  const exerciseName = 'Bench Press'; 

  const exerciseList = [
    { Title: 'Bench Press', exerciseImage: 'https://example.com/benchpress.jpg' },
    { Title: 'Squat', exerciseImage: 'https://example.com/squat.jpg' },
  ];

  t.is(exerciseList.length, 2, 'Exercise list should initially contain 2 exercises'); //2 ασκησεις υπαρχονυ

  // Κλήση της συνάρτησης διαγραφής
  const response = await adminAdminIDExercisesDELETE(adminID, exerciseName, exerciseList);

  // Ελέγχω ότι η λίστα έχει 1 άσκηση μετά τη διαγραφή
  t.is(exerciseList.length, 1, 'Exercise list should contain 1 exercise after deletion');

  // Ελέγχω ότι η διαγραμμένη άσκηση δεν υπάρχει στη λίστα
  t.false(exerciseList.some((exercise) => exercise.Title === exerciseName), 'Deleted exercise should not exist in the list');

  t.is(response.message, `Exercise '${exerciseName}' deleted successfully`, 'Should return success message');
});




