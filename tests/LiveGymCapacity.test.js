const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index'); 

const { liveCapacityPUT } = require('../service/LiveGymCapacityService.js');


test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
  }); 
  
  test.after((t) => {
      t.context.server.close();
  }); 

// Ελέγχει αν επιστρέφεται σωστά το status code
  test('PUT LiveGymCapacity returns success message', async (t) => {
    const mockData = {
        liveCapacity: 30, 
    };

    console.log('mockDATA:', mockData);

    const {statusCode} = await t.context.got.put('LiveCapacity', {
        json: mockData, 
    });
    t.is(statusCode, 200, 'Should return 200');
});

// Ελέγχει αν λείπει το livecapacity
test('PUT LiveGymCapacity fails with missing liveCapacity', async (t) => {
    const mockData = {}; // όταν δεν έχει καμία τιμή

    const {statusCode, body} = await t.context.got.put('LiveCapacity', {
        json: mockData,
    });
    console.log(body);
    t.is(statusCode, 400, 'Should return 400    for missing liveCapacity');
});


// Ελέγχει αν έχει αρνητική τιμή το liveCapacity
test('PUT LiveGymCapacity/ fails if negative ', async (t) => {
    const mockData = {
        liveCapacity: -5, // Μη έγκυρη τιμή δεν γινεται <0
    };

    const {statusCode , body}  = await t.context.got.put('LiveCapacity', {
        json: mockData,
    }); 

    
    console.log(body);
    t.is(statusCode, 400, 'Should return 400 Bad Request for negative liveCapacity');
    t.is(body.error, 'liveCapacity must be a positive number');


});

test('PUT LiveGymCapacity /fails if invalid data ', async (t) => {
    const mockData = {
        liveCapacity: "35", // λάθος τύπος
    };

    const {statusCode} = await t.context.got.put('LiveCapacity', {
        json: mockData,
    });

    t.is(statusCode, 400, 'Should return 400 Bad Request for invalid data type');

});


test("PUT /", async (t) => {
    
    // Ελέγχω την συνάρτηση που καλώ 
    const live = await liveCapacityPUT(55);
    console.log(live);

    t.truthy(live);
    t.is(live,55);

});