const test = require('ava').default; 
const got = require('got'); 
const http = require('http'); 
const listen = require('test-listen'); 

const app = require('../index.js');
const { contactInformationGET } = require('../service/DefaultService.js');

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

test('GET /ContactInformation should return HTTP 200', async (t) => {
    const response = await t.context.got.get('ContactInformation');``
  
    t.is(response.statusCode, 200, 'Should return HTTP 200');
});

test('GET /ContactInformation should return application/json as Content-Type', async (t) => {
    const response = await t.context.got.get('ContactInformation');

    const contentType = response.headers['content-type'];
    t.truthy(contentType, 'The response should have a Content-Type header');
    t.true(contentType.includes('application/json'), 'Content-Type should include application/json');
});

// Mporei na min xreiazetai
test('GET /ContactInformation should return a 404 for non-existing route', async (t) => {
    const response = await t.context.got.get('NonExistingRoute');
  
    t.is(response.statusCode, 404, 'Should return HTTP 404 for a non-existing route');
});

test('GET /ContactInformation should return the correct contact details in JSON format', async (t) => {
    const response = await t.context.got.get('ContactInformation');
    const contactInfo = JSON.parse(response.body);
    
    t.is(contactInfo.Email, 'contact@info.com', 'Email should be correct');
    t.is(contactInfo.PhoneNumber, 1, 'PhoneNumber should be correct');
    t.is(contactInfo.PhysicalAddress, 'PhysicalAddress', 'PhysicalAddress should be correct');
});

test('GET /ContactInformation returns a valid email format', async (t) => {
    const response = await t.context.got.get('ContactInformation');
    const contactInfo = JSON.parse(response.body);

    const email = contactInfo.Email;
    t.true(typeof email === 'string', 'Email should be a string');
    t.true(email.includes('@'), 'Email should contain "@"');
});

test('GET /ContactInformation returns valid phone number format', async (t) => {
    const response = await t.context.got.get('ContactInformation');
    const contactInfo = JSON.parse(response.body);

    const phoneNumber = contactInfo.PhoneNumber;
    t.true(Number.isInteger(phoneNumber), 'Phone number should be an integer');
    t.true(phoneNumber > 0, 'Phone number should be positive');
});

test('GET /ContactInformation returns a valid physical address', async (t) => {
    const response = await t.context.got.get('ContactInformation');
    const contactInfo = JSON.parse(response.body);

    const physicalAddress = contactInfo.PhysicalAddress;
    t.true(typeof physicalAddress === 'string', 'Physical address should be a string');
    t.true(physicalAddress.length > 0, 'Physical address should not be empty');
});

//Na elekso oti einai swstoi oi tupoi dedomenwn
//mock