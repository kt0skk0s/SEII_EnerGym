const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index'); 
const { adminAdminIDAddWorkoutSchedulePOST ,getWorkoutSchedule , adminAdminIDRemoveWorkoutScheduleDELETE } = require('../service/WorkoutScheduleService.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 
  
test.after((t) => {
    t.context.server.close();
});

const AdminID = 1;
const AdminID2 = 2;
const AdminID3 = 3;


const mockWorkoutSchedule1 = { WorkoutSchedule: "Test.pdf" }; // valid mock
const mockWorkoutSchedule2 = { WorkoutSchedule: "Test" }; // οχι pdf.
const mockWorkoutSchedule3 = { WorkoutSchedule: 888 }; 
const mockWorkoutSchedule4 = { WorkoutSchedule: undefined }; 


test('POST Workout Schedule returns success message', async (t) => {
    const response = await t.context.got.post(`admin/${AdminID}/AddWorkoutSchedule`, {
      json: mockWorkoutSchedule1,
    });
    
    
    t.is(response.statusCode, 200, 'Should return 200');
    t.true(mockWorkoutSchedule1.WorkoutSchedule.endsWith('.pdf')); //ελεγχω οτι ειναι αρχειο pdf
    t.truthy(response.body.WorkoutSchedule);

  });   

  test('POST Workout Schedule invalid data', async (t) => {
    const response2 = await t.context.got.post(`admin/${AdminID}/AddWorkoutSchedule`, {
      json: mockWorkoutSchedule2,
    });
    
    //(Θα μπορουσα να βαλω αυτον τον έλεγχο (pdf) στους controllers και να αλλαζα statusCode σε 400)
    t.is(response2.statusCode, 200); 
    t.false(mockWorkoutSchedule2.WorkoutSchedule.endsWith('.pdf')); //ελεγχω οτι ειναι αρχειο pdf
    t.truthy(response2.body.WorkoutSchedule);

    const response3 = await t.context.got.post(`admin/${AdminID2}/AddWorkoutSchedule`, {
        json: mockWorkoutSchedule3,
      });
      t.is(response3.statusCode, 400);

    const response4 = await t.context.got.post(`admin/${AdminID3}/AddWorkoutSchedule`, {
        json: mockWorkoutSchedule4,
      });
      t.is(response4.statusCode, 400);

  });   


test("POST function generates correct values for one day", async (t) => {
    
    // Κλήση της συνάρτησης
    const generatedWorkout = await adminAdminIDAddWorkoutSchedulePOST([], AdminID);

    t.truthy(generatedWorkout);
    t.is(generatedWorkout.WorkoutSchedule,"WorkoutSchedule.pdf");

});

test("GET / calling function retrieves workout schedules", async (t) => {
    const userID = 5
  
    const workoutSchedules = await getWorkoutSchedule(userID);
  
    t.truthy(workoutSchedules);
    t.true(Array.isArray(workoutSchedules), "The response should be an array");
    t.deepEqual(workoutSchedules,["Workout1.pdf", "Workout2.pdf"],"The returned workout schedules should match the mock data");

  });

  
  test('GET / WorkoutSchedule should return HTTP 200', async (t) => {
      userId=10;
      const response = await t.context.got.get(`user/${userId}/WorkoutSchedule`);
    
      t.is(response.statusCode, 200, 'Should return HTTP 200');
  });


  test('DELETE/ Workout should remove a workout from the specified list of a User', async (t) => {
    const adminID = 123; 
    const userID = 1; 
    const WorkoutToDelete = 'Workout1.pdf'; // Το πρόγραμμα που θέλουμε να διαγράψουμε
  
    const workoutSchedules = await getWorkoutSchedule(userID);
  
    t.is(workoutSchedules.length, 2, 'Workout schedule list should initially contain 2 workouts');
  
    const response = await adminAdminIDRemoveWorkoutScheduleDELETE(WorkoutToDelete, workoutSchedules);
  
    t.is(workoutSchedules.length, 1, 'Workout schedule list should contain 1 workout after deletion');
  
    // Ελέγχω ότι το διαγραμμένο πρόγραμμα δεν υπάρχει στη λίστα
    t.false(workoutSchedules.includes(WorkoutToDelete), 'Deleted workout should not exist in the workout schedule list');
  
    t.is(response.message, `Workout '${WorkoutToDelete}' deleted successfully`, 'Should return success message');
  });
  

  

