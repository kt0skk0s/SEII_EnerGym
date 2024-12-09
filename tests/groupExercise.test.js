const test = require('ava').default; // Import Ava test
const got = require('got'); // HTTP client
const http = require('http'); // HTTP server
const listen = require('test-listen'); // Test server helper

const app = require('../index.js'); // Import your app
const { BookGroupExercisePOST } = require('../service/DefaultService.js');


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


test('Book group exercise resolves with booking details', async (t) => {
  const body = {
    groupExerciseId: '123',
    time: '20:30',
  };
  const userId = 'user123';

  const result = await BookGroupExercisePOST(body, userId);

  t.deepEqual(result, {
    success: true,
    message: 'Booking confirmed',
    userId: 'user123',
    details: body,
  });
});