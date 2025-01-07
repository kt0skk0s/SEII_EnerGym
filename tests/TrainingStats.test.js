const test = require('ava').default; 
const got = require('got'); 
const http = require('http'); 
const listen = require('test-listen'); 

const app = require('../index.js');
const { userUserIdTrainingStatsGET } = require('../service/TrainingStatsService.js');

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

mock1 = { UserId: '1234', trainingStats: { Histogram: 'Histogram2.img', TimesPerMonth: 7, AverageTime: 40 } };
mock2 = { UserId: '4567', trainingStats: { Histogram: 'Histogram2.img', TimesPerMonth: 6, AverageTime: 55 } };


test('GET /user/{UserId}/TrainingStats should return 200 for an existing route', async (t) => {
  // Αντικατάστησε το {UserId} με έναν πραγματικό ή mock UserId
  const response1 = await t.context.got.get(`user/${mock1.UserId}/TrainingStats`);
  const response2 = await t.context.got.get(`user/${mock2.UserId}/TrainingStats`);

  t.is(response1.statusCode, 200, 'Should return HTTP 200 for an existing route');
  t.is(response2.statusCode, 200, 'Should return HTTP 200 for an existing route');

});


// Test for valid Content-Type
test('GET /user/{UserId}/TrainingStats should return application/json as Content-Type', async (t) => {
    const response = await t.context.got.get(`user/${mock1.UserId}/TrainingStats`);

    const contentType = response.headers['content-type'];
    t.truthy(contentType, 'The response should have a Content-Type header');
    t.true(contentType.includes('application/json'), 'Content-Type should include application/json');
});



// Test for correct structure and data format
test('GET /user/{UserId}/TrainingStats should return the correct training statistics in JSON format', async (t) => {
    const response = await t.context.got.get(`user/${mock1.UserId}/TrainingStats`);

    const trainingStats = JSON.parse(response.body);
    
    t.truthy(trainingStats.Histogram );
    t.truthy(trainingStats.TimesPerMonth);
    t.truthy(trainingStats.AverageTime);
});



// Test for valid Histogram format (string)
test('GET /user/{UserId}/TrainingStats should return valid Histogram as string', async (t) => {
    const response = await t.context.got.get(`user/${mock1.UserId}/TrainingStats`);
    const trainingStats = JSON.parse(response.body);

    const histogram = trainingStats.Histogram;
    t.true(typeof histogram === 'string', 'Histogram should be a string');
    t.true(histogram.length > 0, 'Histogram should not be empty');

    
    const timesPerMonth = trainingStats.TimesPerMonth;
    t.true(Number.isInteger(timesPerMonth), 'TimesPerMonth should be an integer');
    t.true(timesPerMonth >= 0, 'TimesPerMonth should not be negative');

    const averageTime = trainingStats.AverageTime;
    t.true(Number.isInteger(averageTime), 'AverageTime should be an integer');
    t.true(averageTime >= 0, 'AverageTime should not be negative')
});

test("GET / TrainingStats calling function retrieves workout schedules", async (t) => {
    
    const TrainingStats = await userUserIdTrainingStatsGET(mock1.UserId);
    t.truthy(TrainingStats); // οτι ειναι object

  });

