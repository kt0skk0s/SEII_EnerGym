const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    http2: true,
    throwHttpErrors: false,
    responseType: "json",
    prefixUrl: t.context.prefixUrl,
  });
});

test.after((t) => {
  t.context.server.close();
});

/*
test("userUserIdTrainingStatsGET returns correct training stats for valid userId", async (t) => {
  const userId = "validUserId";

  const response = await t.context.got.get(`user/${userId}/training-stats`);
  t.is(response.statusCode, 200, "Response status should be 200");
  t.deepEqual(
    response.body,
    {
      Histogram: "",
      TimesPerMonth: 6,
      AverageTime: 0,
    },
    "Response body should match the expected training stats"
  );
});

test("userUserIdTrainingStatsGET handles missing data gracefully", async (t) => {
  const userId = "userWithNoData";

  const response = await t.context.got.get(`user/${userId}/training-stats`);
  t.is(response.statusCode, 200, "Response should return 200 for missing data");
  t.deepEqual(
    response.body,
    {
      Histogram: "",
      TimesPerMonth: 0,
      AverageTime: 0,
    },
    "Response body should return default or empty stats"
  );
});

const invalidUserIds = [null, undefined, "abc", 1.5, {}, [], true];

test("userUserIdTrainingStatsGET with invalid userId returns 400", async (t) => {
  for (const invalidId of invalidUserIds) {
    const response = await t.context.got.get(`user/${invalidId}/training-stats`);
    t.is(response.statusCode, 400, "Should return 400 for invalid userId");
    t.truthy(response.body.message, "Response should have an error message");
  }
});

test("userUserIdTrainingStatsGET with non-existent userId returns 404", async (t) => {
  const nonExistentUserId = "nonExistentUserId";

  const response = await t.context.got.get(`user/${nonExistentUserId}/training-stats`);
  t.is(response.statusCode, 404, "Should return 404 for non-existent userId");
  t.truthy(response.body.message, "Response should have an error message");
  t.is(response.body.message, "User not found", "Error message should indicate user not found");
});*/

/*test('PUT /training-stats updates training stats correctly', async (t) => {
  const userId = 1000;
  const updatedTrainingStats = {
      Histogram: "updated histogram",
      TimesPerMonth: 8,
      AverageTime: 120,
  };

  const { body, statusCode } = await t.context.got.put(`user/${userId}/training-stats`, {
      json: updatedTrainingStats,
      responseType: 'json',
  });

  // Assertions
  t.is(statusCode, 200, 'Should return 200 OK on successful update');
  t.deepEqual(body, updatedTrainingStats, 'Response body should match the updated training stats');
});

test('POST /training-stats creates training stats successfully', async (t) => {
  const userId = 1001 ;
  const newTrainingStats = {
      Histogram: "new histogram data",
      TimesPerMonth: 6,
      AverageTime: 90,
  };

  const { body, statusCode } = await t.context.got.post(`user/${userId}/training-stats`, {
      json: newTrainingStats,
      responseType: 'json',
  });

  // Assertions
  t.is(statusCode, 200, 'Should return 200 OK on successful creation');
  t.deepEqual(body, newTrainingStats, 'Response body should match the new training stats');
});
*/
/*test('GET /training-stats retrieves the correct training stats', async (t) => {
  const userId = 1002;

  const trainingStats = {
      Histogram: "retrieved histogram data",
      TimesPerMonth: 4,
      AverageTime: 60,
  };

  const response = await t.context.got.get(`user/${userId}/training-stats`, {
      responseType: 'json',
  });

  // Assertions
  t.is(response.statusCode, 200, 'Should return 200 OK');
  t.deepEqual(response.body, trainingStats, 'Should return the correct training stats');
});
/*
test('POST /training-stats returns correct headers', async (t) => {
  const userId = 1010;
  const trainingStats = {
      Histogram: "header check histogram",
      TimesPerMonth: 10,
      AverageTime: 75,
  };

  const { headers, statusCode } = await t.context.got.post(`user/${userId}/training-stats`, {
      json: trainingStats,
  });

  // Assertions
  t.is(statusCode, 200, 'Should return 200 OK');
  t.truthy(headers['content-type'], 'Response should have content-type header');
  //t.regex(headers['content-type'], /application\/json/, 'Content-Type should be application/json');
});

test('POST /training-stats with invalid training data returns 400', async (t) => {
  const userId = 660;
  const invalidTrainingStats = {
      Histogram: 123, // Invalid type
      TimesPerMonth: "six", // Invalid type
      AverageTime: null, // Invalid value
  };

  const { body, statusCode } = await t.context.got.post(`user/${userId}/training-stats`, {
      json: invalidTrainingStats,
  });

  // Assertions
  t.is(statusCode, 400, 'Should return 400 Bad Request for invalid training stats');
  t.truthy(body.message, 'Response should include an error message');
});

const invalidUserIds = [null, undefined, "abc", 1.5, {}, [], true];
*/
test('GET /training-stats with invalid userId returns 400', async (t) => {
    for (const invalidId of invalidUserIds) {
        const { statusCode, body } = await t.context.got.get(`user/${invalidId}/training-stats`, {
            responseType: 'json',
        });

        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for invalid userId');
        t.truthy(body.message, 'Response should include an error message');
    }
});

test('GET /training-stats for non-existent userId returns 404', async (t) => {
  const nonExistentUserId = 999999;

  const { statusCode, body } = await t.context.got.get(`user/${nonExistentUserId}/training-stats`, {
      responseType: 'json',
  });

  // Assertions
  t.is(statusCode, 404, 'Should return 404 Not Found for non-existent userId');
  t.truthy(body.message, 'Response should include a "not found" message');
});



/* Test: Fetch weekly training stats
test('Fetch weekly training stats', async (t) => {
  const response = await t.context.got.get('training-stats/weekly'); // API endpoint for weekly stats

  t.is(response.statusCode, 200, 'Response should return 200 status');
  
  const expectedStats = {
    "Workout/week": 3,
    "Average time": "80 mins",
  };

  t.deepEqual(response.body, expectedStats, 'Weekly stats should match the expected data');
});

// Test: Check histogram data
test('Fetch training stats histogram data', async (t) => {
  const response = await t.context.got.get('training-stats/histogram'); // API endpoint for histogram data

  t.is(response.statusCode, 200, 'Response should return 200 status');
  
  // Expected histogram example data
  const expectedHistogram = [
    { month: "January", count: 5 },
    { month: "February", count: 8 },
    { month: "March", count: 3 },
    { month: "April", count: 7 },
  ];

  t.deepEqual(response.body, expectedHistogram, 'Histogram data should match the expected structure and values');
});

// Test: Invalid request for training stats
test('Invalid request for training stats', async (t) => {
  const response = await t.context.got.get('training-stats/invalid-endpoint'); // Invalid API endpoint

  t.is(response.statusCode, 404, 'Response should return 404 for invalid endpoints');
  
  const expectedError = { error: "Endpoint not found" };
  t.deepEqual(response.body, expectedError, 'Error message should indicate endpoint not found');
});

// Test: Validate training stats structure
test('Validate training stats response structure', async (t) => {
  const response = await t.context.got.get('training-stats/weekly'); // API endpoint for weekly stats

  t.is(response.statusCode, 200, 'Response should return 200 status');
  
  const stats = response.body;
  t.truthy(stats["Workout/week"], 'Workout/week should be present in stats');
  t.truthy(stats["Average time"], 'Average time should be present in stats');
  t.is(typeof stats["Workout/week"], 'number', 'Workout/week should be a number');
  t.regex(stats["Average time"], /\d+\smins/, 'Average time should follow the format "XX mins"');
});

// Test: Training stats without data
test('Handle empty training stats response gracefully', async (t) => {
  const response = await t.context.got.get('training-stats/empty'); // API endpoint simulating empty stats

  t.is(response.statusCode, 200, 'Response should return 200 status for valid but empty data');
  t.deepEqual(response.body, {}, 'Response body should be an empty object');
});

// Test: Validate histogram format
test('Validate training stats histogram format', async (t) => {
  const response = await t.context.got.get('training-stats/histogram'); // API endpoint for histogram data

   t.is(response.statusCode, 200, 'Response should return 200 status');
  
  const histogram = response.body;
  t.true(Array.isArray(histogram), 'Histogram data should be an array');

  histogram.forEach((entry) => {
    t.truthy(entry.month, 'Each entry should have a "month" field');
    t.truthy(entry.count, 'Each entry should have a "count" field');
    t.is(typeof entry.month, 'string', '"month" field should be a string');
    t.is(typeof entry.count, 'number', '"count" field should be a number');
  });
});
*/