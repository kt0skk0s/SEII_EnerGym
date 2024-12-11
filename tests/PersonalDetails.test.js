const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { userUserIdPersonalDetailsPOST , PersonalDetailsPUT } = require('../service/DefaultService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
  }); 
  
  test.after((t) => {
      t.context.server.close();
  }); 


  const mockUser = {
    userId: 999,
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


test('POST/ PersonalDetails returns success response', async (t) => {
    const newUserID = 9;
    mockUser.userId = newUserID;
    const { body, statusCode } = await t.context.got.post(`user/${mockUser.userId}/PersonalDetails`, {
        json: mockUser.PersonalDetails,  
        responseType: 'json'
    });
   
    t.is(statusCode, 200 , 'Should return 200');
                        
    t.truthy(body.Name, 'Name should be returned in response');
    t.truthy(body.Surname, 'Surname should be returned in response');
    t.truthy(body.Age, 'Age should be returned in response');
    t.truthy(body.email, 'Email should be returned in response');
    t.truthy(body.Mobilenumber, 'Mobile number should be returned in response');
    t.truthy(body.Weight, 'Weight should be returned in response');
    t.truthy(body.Goal, 'Goal should be returned in response');
});


test("Post /PersonalDetails function returns user details", async (t) => {
     newUserID = 158;
    const newMockUser = {
        userId : newUserID,
        PersonalDetails: {
            Name: "A string",
            Surname: "A string",
            Age: 43,
            email: "Astring.@mail.com",
            Mobilenumber: 96358885,
            Weight: 90,
            Goal: "A string"
        }
    };

    const User = await userUserIdPersonalDetailsPOST(newMockUser);
    t.truthy(User.Name);
    t.truthy(User.Surname);
    t.truthy(User.Age);
    t.truthy(User.Goal);
    t.truthy(User.Weight);
    t.truthy(User.email);
    t.truthy(User.Mobilenumber);
});

test("Post/ PersonalDetails function returns correct headers", async (t) => {
    const newUserID = 14;
    mockUser.userId = newUserID;
    const { headers, statusCode } = await t.context.got.post(`user/${mockUser.userId}/PersonalDetails`, {
        json: mockUser.PersonalDetails,  
    });
    // Assertions
    t.is(statusCode, 200, 'Should return 200 ');
    t.truthy(headers['content-type'], 'Response should have content-type header');
});


    BadUserID = 660;
    const BadMockUser = {
        userID : BadUserID,
        PersonalDetails: {
            Name: 77,
            Surname: "A string",
            Age: 43,
            email: "Astring.@mail.com",
            Mobilenumber: "4444444",
            Weight: 90,
            Goal: "A string"
        }
    };

test('POST PersonalDetails with invalid userId returns fail response - 400 ', async (t) => {
    const BadUserID = 660;
    BadMockUser.userId = BadUserID;
    const { body, statusCode } = await t.context.got.post(`user/${BadMockUser.userId}/PersonalDetails`, {
        json: BadMockUser,
    });
    // Assertions
    t.is(statusCode, 400, 'Should return 400 Bad input type for user'); //sto api na prostheso to 400 

});

/*
test('POST contactDetails returns the correct response', async (t) => {
    const mockContactDetails = {
        Email: "test@example.com",
        PhoneNumber: "9655574",
        Address: "ADdress"
    };
    
    const response = await t.context.got.post('contactDetails', {
        json: mockContactDetails
    });
    
    // Assertions
    t.is(response.statusCode, 200, 'Should return 200 OK');
    t.deepEqual(response.body, mockContactDetails, 'Response body should match the mock contact details');
});
*/