const test = require('ava').default; 
const got = require('got'); 
const http = require('http'); 
const listen = require('test-listen'); 

const app = require('../index.js');
const { eshopGET } = require('../service/EshopService.js');


test.before(async (t) => {    
    t.context.server = http.createServer(app); 
    t.context.prefixUrl = await listen(t.context.server); 
    t.context.got = got.extend({prefixUrl: t.context.prefixUrl, throwHttpErrors: false,        
    });
  });

// Cleanup: Close the test server after tests
test.after.always((t) => {
    t.context.server.close();
  });


// Ελέγχει κατά πόσο επιστρέφει το σωστό link για το eshop
test('GET /Eshop should return the e-shop URL', async (t) => {
    const response = await t.context.got.get('Eshop');
  
    t.is(response.statusCode, 200, 'Should return HTTP 200');
    t.is(response.body, 'http://example.com/aeiou', 'Should return the correct e-shop URL');
  });

// Ελέγχει αν επιστρέφεται 404 και στέλνει μήνυμα για το non-existing route
  test('GET /NonExistingRoute should return 404', async (t) => {
    const response = await t.context.got.get('NonExistingRoute');

    t.is(response.statusCode, 404, 'Should return HTTP 404 for a non-existing route');
  });

// Ελέγχει κατά πόσο είναι σωστό το format του link
  test('GET /Eshop returns a valid URL string', async (t) => {
    const response = await t.context.got.get('Eshop');

    const url = response.body;
    t.true(typeof url === 'string', 'The response body should be a string');
    t.true(url.startsWith('http://'), 'The URL should start with "http"');
});

// Ελέγχει το χρόνο για να επιστραφεί το link να είναι λιγότερο απο 1250ms
   test('GET /Eshop should respond within 1250ms', async (t) => {
    const startTime = Date.now();
    const response = await t.context.got.get('Eshop');
    const elapsedTime = Date.now() - startTime;

    // Έλεγχοι
    console.log("TIME" , elapsedTime);
    t.is(response.statusCode, 200, 'Should return HTTP 200');
    t.true(elapsedTime < 1250, `Response time should be less than 500ms, but was ${elapsedTime}ms`);
});

test('GET /Eshop returns application/json as Content-Type', async (t) => {
    const response = await t.context.got.get('Eshop');

    const contentType = response.headers['content-type'];
    t.truthy(contentType, 'The response should have a Content-Type header');
    t.true(contentType.includes('application/json'), 'Content-Type should include application/json');
});

 test("GET / calling function returning eshop url", async (t) => {
      const userID = 5
    
      const eshop = await eshopGET(userID);
      t.truthy(eshop); 
  
    });