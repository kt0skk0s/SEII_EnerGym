const test = require('ava').default; // Import Ava test
const got = require('got'); // HTTP client
const http = require('http'); // HTTP server
const listen = require('test-listen'); // Test server helper

const app = require('../index.js'); // Import your app
const { AddGroupExerciseSchedulePOST, EditGroupExerciseSchedulePUT, RemoveGroupExerciseScheduleDELETE } = require('../service/DefaultService.js'); // Import service methods

// Setup: Start a test server before tests
test.before(async (t) => {
  t.context.server = http.createServer(app); // Create HTTP server
  t.context.prefixUrl = await listen(t.context.server); // Get test server URL
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
});

// Cleanup: Close the test server after tests
test.after.always((t) => {
  t.context.server.close();
});

// Test: Add group exercise schedule
test('Add group exercise schedule', async (t) => {
  const body = {
    scheduleName: 'Morning Yoga',
    time: '08:00 AM',
    days: ['Monday', 'Wednesday', 'Friday'],
  };
  const adminId = 'admin123';

  const result = await AddGroupExerciseSchedulePOST(body, adminId);

  // Assert the expected response
  t.deepEqual(result, {
    message: 'Successful group exercise upload',
    schedule: {
      scheduleName: 'Morning Yoga',
      time: '08:00 AM',
      days: ['Monday', 'Wednesday', 'Friday'],
      adminId: 'admin123',
    },
  });
});

// Test: Edit group exercise schedule
test('Edit group exercise schedule', async (t) => {
  const body = {
    scheduleId: 'schedule123',
    changes: {
      time: '09:00 AM',
      days: ['Tuesday', 'Thursday'],
    },
  };
  const adminId = 'admin123';

  const result = await EditGroupExerciseSchedulePUT(body, adminId);

  t.deepEqual(result, {
    message: 'Successful group exercise edit',
    updatedSchedule: {
      scheduleId: 'schedule123',
      time: '09:00 AM',
      days: ['Tuesday', 'Thursday']
    },
  });
});

test('Remove group exercise schedule resolves successfully', async (t) => {
  const adminID = 'admin123';
  const groupExerciseId = 'exercise1';

  // Call the function
  const result = await RemoveGroupExerciseScheduleDELETE(adminID, groupExerciseId);

  // Since the function only resolves and does nothing, check for undefined or success
  t.is(result, undefined);
});
