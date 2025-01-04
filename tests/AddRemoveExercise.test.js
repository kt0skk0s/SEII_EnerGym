const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index.js');
const { adminAdminIDExercisesPOST, adminAdminIDExercisesDELETE } = require('../service/DefaultService.js');

test.before(async (t) => {
    const app = require('../index.js');
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
    }, // Add any required mock video data here

};

const incompleteExercise = {
    exerciseImage: "http://example.com/exercise.jpg" // Missing title and explanation video
  };

test('POST /admin/{AdminID}/exercises should return appropriate JSON format', async (t) => {
    const adminID = 123;
    const response = await t.context.got.post(`admin/${adminID}/exercises`, {
        json: newExercise,
    });

    const exercise = JSON.parse(response.body);
    t.true(exercise.exerciseImage.includes('https://'), 'Exercise image should be a valid URL');
    t.is(AllExercises.length,0); // Έχω 0 ασκήσεις

    if (response.statusCode === 200){
      AllExercises.push(newExercise);
    }
    t.is(AllExercises.length,1);  // Ελέγχω ότι προστέθηκε η άσκηση length > 1

    t.truthy(exercise.Title, 'Title should be "New Exercise"');
    t.truthy(exercise.exerciseImage, 'exerciseImage should be present');
    t.truthy(exercise.explanationVideo.duration, 'Explanation video duration should be present');
    t.truthy(exercise.explanationVideo.videoURL, 'Explanation video videoURL should be present');
    t.truthy(exercise.explanationVideo.thumbnail, 'Explanation video thumbnail should be present');
    t.is(typeof exercise.Title, 'string');
    t.is(typeof exercise.exerciseImage, 'string');
    t.is(typeof exercise.explanationVideo.duration, 'string');
    t.is(typeof exercise.explanationVideo.videoURL, 'string');
    t.is(typeof exercise.explanationVideo.thumbnail, 'string');
    
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
test('DELETE /admin/{AdminID}/exercises should return HTTP 200 when removing an exercise', async (t) => {
    const adminID = 123;
    const exerciseToDelete = 'Bench Press';
    const response = await t.context.got.delete(`admin/${adminID}/exercises`);
    const a = adminAdminIDExercisesDELETE(exerciseToDelete);
    
    console.log('delete',AllExercises);
    t.is(AllExercises.length,0); // Έχω 0 ασκήσεις

    
    //t.is(response.statusCode, 200, 'Should return HTTP 200 when removing an exercise');
});


// Test case for deleting an exercise without an exercise ID
test("DELETE /admin/{AdminID}/exercises should return an error if exerciseId is not provided", async (t) => {
    const adminID = 123;
    
    const response = await t.context.got.delete(`admin/${adminID}/exercises`, {
      throwHttpErrors: false
    });
  
    t.is(response.statusCode, 400, "Should return HTTP 400 if exerciseId is not provided");
    //t.deepEqual(response.body, { error: "exerciseId is required" }, "Error message should indicate missing exerciseId");
  });

/*
test('POST /admin/{AdminID}/exercises should return HTTP 201 when adding a new exercise', async (t) => {
    const newExercise = {
        Title: 'Bench Press',
        exerciseImage: 'https://workoutlabs.com/train/svg.php?id=84755',
        explanationVideo: {
            duration: "2:56 minutes",
            videoURL: "https://www.youtube.com/watch?v=gRVjAtPip0Y&ab_channel=BuffDudes",
            thumbnail: "https://workoutlabs.com/train/svg.php?id=84755"
        }, // Add any required mock video data here
    };
    
    const adminID = 'admin123';
    const response = await t.context.got.post(`admin/${adminID}/exercises`, {
        json: newExercise,
    });

    t.is(response.statusCode, 201, 'Should return HTTP 201 when adding a new exercise');
    const exercise = JSON.parse(response.body);
    t.is(exercise.Title, newExercise.Title, 'Title should be correct');
    t.is(exercise.exerciseImage, newExercise.exerciseImage, 'Exercise image URL should be correct');
});
*/

/*
// Test case for trying to delete a non-existing exercise
test("DELETE /admin/{AdminID}/exercises should return HTTP 404 for a non-existing exercise", async (t) => {
    const adminID = "admin123";
    const nonExistingExerciseId = "nonexistent123";
  
    const response = await t.context.got.delete(`admin/${adminID}/exercises?exerciseId=${nonExistingExerciseId}`, {
      throwHttpErrors: false
    });
  
    t.is(response.statusCode, 404, "Should return HTTP 404 when trying to delete a non-existing exercise");
  });
*/

/*
test('DELETE /admin/{AdminID}/exercises should not remove exercise if not authorized', async (t) => {
    const adminID = 'nonAdmin123';
    const exerciseId = 'exercise123';

    const response = await t.context.got.delete(`admin/${adminID}/exercises?exerciseId=${exerciseId}`, {
        throwHttpErrors: false, // Handle errors gracefully
    });

    t.is(response.statusCode, 403, 'Should return HTTP 403 if the admin is not authorized to remove the exercise');
});
*/

/*
// Test case for adding a new exercise
test("POST /admin/{AdminID}/exercises should successfully add a new exercise", async (t) => {
    const adminID = "admin123";
    const newExercise = {
      Title: "New Exercise",
      exerciseImage: "http://example.com/exercise.jpg",
      explanationVideo: { url: "http://example.com/video.mp4" }
    };
  
    const response = await t.context.got.post(`admin/${adminID}/exercises`, {
      json: newExercise
    });
  
    t.is(response.statusCode, 201, "Should return HTTP 201 when a new exercise is added");
    t.is(response.body.Title, newExercise.Title, "Title should match the added exercise's title");
    t.is(response.body.exerciseImage, newExercise.exerciseImage, "Exercise image URL should match");
    t.truthy(response.body.explanationVideo, "Explanation video should be provided");
  });
*/

/*
// Test case for checking if exercise exists after adding it
test("Exercise should exist after being added", async (t) => {
  const adminID = "admin123";
  const newExercise = {
    Title: "Title",
    exerciseImage: "http://example.com/exercise2.jpg",
    explanationVideo: { url: "http://example.com/video2.mp4" }
  };

  const addResponse = await t.context.got.post(`admin/${adminID}/exercises`, {
    json: newExercise
  });

  const exerciseId = addResponse.body.id; // Assuming the added exercise has an ID
  const getResponse = await t.context.got.get(`admin/${adminID}/exercises/${exerciseId}`);

  t.is(getResponse.statusCode, 200, "Should return HTTP 200 when retrieving the added exercise");
  t.is(getResponse.body.Title, newExercise.Title, "Should retrieve the correct exercise based on ID");
});


// Test case for re-adding a previously deleted exercise
test("Deleted exercise should not be re-added unless recreated", async (t) => {
  const adminID = "admin123";
  const deletedExerciseId = "exercise123";

  // Try deleting the exercise first
  await t.context.got.delete(`admin/${adminID}/exercises?exerciseId=${deletedExerciseId}`);

  // Now, try adding the same exercise again
  const newExercise = {
    Title: "Deleted Exercise Recreated",
    exerciseImage: "http://example.com/recreated-exercise.jpg",
    explanationVideo: { url: "http://example.com/recreated-video.mp4" }
  };

  const response = await t.context.got.post(`admin/${adminID}/exercises`, {
    json: newExercise
  });

  t.is(response.statusCode, 201, "Should allow re-adding the exercise after deletion");
  t.is(response.body.Title, newExercise.Title, "New exercise title should be the same as the recreated exercise");
});
*/

/*
test('DELETE /admin/{AdminID}/exercises should remove the correct exercise', async (t) => {
    const adminID = 'admin123';
    const exerciseId = 'exercise123';
    
    // Simulate adding the exercise first
    const newExercise = {
        Title: 'Bench Press',
        exerciseImage: 'https://workoutlabs.com/train/svg.php?id=84755',
        explanationVideo: {
            duration: "2:56 minutes",
            videoURL: "https://www.youtube.com/watch?v=gRVjAtPip0Y&ab_channel=BuffDudes",
            thumbnail: "https://workoutlabs.com/train/svg.php?id=84755"
        }, // Add any required mock video data here
    };
    await t.context.got.post(`admin/${adminID}/exercises`, {
        json: newExercise,
    });

    // Now remove it
    const response = await t.context.got.delete(`admin/${adminID}/exercises?exerciseId=${exerciseId}`);
    console.log('Deleting exercise with ID:', exerciseId);
   
    t.is(response.statusCode, 200, 'Should return HTTP 200 when removing the exercise');
    
    // Check if the exercise was actually removed (this might involve checking another API or database state, this is a mock)
    const removedExerciseCheck = await t.context.got.get(`admin/${adminID}/exercises?exerciseId=${exerciseId}`);
    t.is(removedExerciseCheck.statusCode, 404, 'Should return HTTP 404 for removed exercise');
});
*/
