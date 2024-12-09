const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { PersonalDetailsPOST , PersonalDetailsPUT } = require('../service/DefaultService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
  }); 
  
  test.after((t) => {
      t.context.server.close();
  }); 


  const mockUser = {
    userID: 999,
    PersonalDetails: {
        Name: "Name",
        Surname: "SName",
        Age: 23,
        email: "NameSN.@example.com",
        Mobilenumber: 96357845,
        Weight: 70,
        Goal: "Goal"
    }
};


/*
test('PUT updateUserDetails returns success response with required fields', async (t) => {
    const { body, statusCode } = await got.put(`user/${mockUser.userID}/PersonalDetails`, {
        json: mockUser.PersonalDetails,  
        responseType: 'json'
    });
    **
    // Assertions
    t.is(statusCode, 200, 'Should return 200 OK for successful userDetails update');
    t.truthy(body.Age, 'Age should be returned in response');
    t.truthy(body.Weight, 'Weight should be returned in response');
   
});
*/

test('POST  addUserDetails returns success response with required fields', async (t) => {
    const newUserID = 1456;
    mockUser.userID = newUserID;
    const { body, statusCode } = await t.context.got.post(`user/${mockUser.userID}/PersonalDetails`, {
        json: mockUser.PersonalDetails,  
        responseType: 'json'
    });
    // Assertions
  //  t.is(statusCode, 200, 'Should return 200 ');

    t.truthy(body.Name, 'Name should be returned in response');
    t.truthy(body.Surname, 'Surname should be returned in response');
    t.truthy(body.Age, 'Age should be returned in response');
    t.truthy(body.email, 'Email should be returned in response');
    t.truthy(body.Mobilenumber, 'Mobile number should be returned in response');
    t.truthy(body.Weight, 'Weight should be returned in response');
    t.truthy(body.Goal, 'Goal should be returned in response');
});


/*
test('POST contactDetails returns the correct response', async (t) => {
    const mockContactDetails = {
        Email: "test@example.com",
        PhoneNumber: "1234567890",
        Address: "1234 Test St"
    };
    
    const response = await t.context.got.post('contactDetails', {
        json: mockContactDetails
    });
    
    // Assertions
    t.is(response.statusCode, 200, 'Should return 200 OK');
    t.deepEqual(response.body, mockContactDetails, 'Response body should match the mock contact details');
});
*/