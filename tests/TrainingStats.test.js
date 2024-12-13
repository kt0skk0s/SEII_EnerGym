const test = require('ava').default; 
const got = require('got'); 
const http = require('http'); 
const listen = require('test-listen'); 

const app = require('../index.js');
const { userUserIdTrainingStatsGET } = require('../service/DefaultService.js');

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


test('GET /user/{UserId}/TrainingStats should return 200 for an existing route', async (t) => {
  // Αντικατάστησε το {UserId} με έναν πραγματικό ή mock UserId
  const response = await t.context.got.get('user/1234/TrainingStats');
  const response2 = await t.context.got.get('user/5678/TrainingStats');

  t.is(response.statusCode, 200, 'Should return HTTP 200 for an existing route');
  t.is(response2.statusCode, 200, 'Should return HTTP 200 for an existing route');

});


// Test for non-existing route (404)
test('GET /user/{UserId}/TrainingStats should return 404 for non-existing route', async (t) => {
    const response404 = await t.context.got.get('user/9999/TrainingStats');
    t.is(response404.statusCode, 404 , 'Should return HTTP 404 for a non existing route');  // Πρέπει να είναι 404
    
});


// Test for valid Content-Type
test('GET /user/{UserId}/TrainingStats should return application/json as Content-Type', async (t) => {
    const response = await t.context.got.get('user/1234/TrainingStats');

    const contentType = response.headers['content-type'];
    t.truthy(contentType, 'The response should have a Content-Type header');
    t.true(contentType.includes('application/json'), 'Content-Type should include application/json');
});


// Test for correct structure and data format
test('GET /user/{UserId}/TrainingStats should return the correct training statistics in JSON format', async (t) => {
    const response = await t.context.got.get('user/1234/TrainingStats');
    const trainingStats = JSON.parse(response.body);
    
    t.is(trainingStats.Histogram, 'Histogram', 'Histogram should be correct');
    t.is(trainingStats.TimesPerMonth, 6, 'TimesPerMonth should be correct');
    t.is(trainingStats.AverageTime, 10, 'AverageTime should be correct');
});



// Test for valid Histogram format (string)
test('GET /user/{UserId}/TrainingStats should return valid Histogram as string', async (t) => {
    const response = await t.context.got.get('user/1234/TrainingStats');
    const trainingStats = JSON.parse(response.body);

    const histogram = trainingStats.Histogram;
    t.true(typeof histogram === 'string', 'Histogram should be a string');
    t.true(histogram.length > 0, 'Histogram should not be empty');
});


// Test for valid TimesPerMonth format (integer)
test('GET /user/{UserId}/TrainingStats should return valid TimesPerMonth format', async (t) => {
    const response = await t.context.got.get('user/1234/TrainingStats');
    const trainingStats = JSON.parse(response.body);

    const timesPerMonth = trainingStats.TimesPerMonth;
    t.true(Number.isInteger(timesPerMonth), 'TimesPerMonth should be an integer');
    t.true(timesPerMonth >= 0, 'TimesPerMonth should not be negative');
});


// Test for valid AverageTime format (integer)
test('GET /user/{UserId}/TrainingStats should return valid AverageTime format', async (t) => {
    const response = await t.context.got.get('user/1234/TrainingStats');
    const trainingStats = JSON.parse(response.body);

    const averageTime = trainingStats.AverageTime;
    t.true(Number.isInteger(averageTime), 'AverageTime should be an integer');
    t.true(averageTime >= 0, 'AverageTime should not be negative');

});

//mock , path(mockId)
//na prosthesw an exw kena dedomena
//api(components) - userid