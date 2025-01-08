
const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { userUserIdPersonalDetailsPOST  } = require('../service/PersonalDetailsService.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
  }); 
  
  test.after((t) => {
      t.context.server.close();
  }); 


  ID = 999;
  const mockUser = {
    UserId: ID,
    PersonalDetails: {
        Name: "MockName",
        Surname: "MockSurName",
        Age: 23,
        email: "mockName.@example.com",
        Mobilenumber: 96357845,
        Weight: 70,
        Goal: "MockGoal"
    }
};

BadUserID = 660; // λάθος τύπος στα Mock δεδομένα
const BadMockUser = {
    UserId : BadUserID,
    PersonalDetails: {
        Name: 77, //επρεπε να ειναι string
        Surname: "A string", 
        Age: 43,
        email: "Astring.@mail.com",
        Mobilenumber: "4444444",
        Weight: 90,
        Goal: "A string"
    }
};

test('POST/ PersonalDetails returns success response', async (t) => {
        
    const { body, statusCode } = await t.context.got.post(`user/${mockUser.userId}/PersonalDetails`, {
        json: mockUser.PersonalDetails,  
        responseType: 'json'
    });
   
    t.is(statusCode, 200 , 'Should return 200'); //έλεγχος αν το statuscode είναι 200
                        
    // ελέγχει αν είναι truthy κάθε τιμή 
    t.truthy(body.Name, 'Name should be returned in response');
    t.truthy(body.Surname, 'Surname should be returned in response');
    t.truthy(body.Age, 'Age should be returned in response');
    t.truthy(body.email, 'Email should be returned in response');
    t.truthy(body.Mobilenumber, 'Mobile number should be returned in response');
    t.truthy(body.Weight, 'Weight should be returned in response');
    t.truthy(body.Goal, 'Goal should be returned in response');

    console.log('Response Body:', body); // ελεγχος μηνυματος στο temrinal

});


// Έλεγχος λαθος τύπων δεδομένων οτι θα επιστρεψει 400 status code
test('POST PersonalDetails with invalid userId returns fail response - 400 ', async (t) => {
    const { body, statusCode } = await t.context.got.post(`user/${BadMockUser.UserId}/PersonalDetails`, {
        json: BadMockUser,
    });
    t.is(statusCode, 400, 'Should return 400 Bad input type for user'); 

});


// Ελεχγος της συνάρτησης που καλώ  (userUserIdPersonalDetailsPOST)
test("Post /PersonalDetails function returns user details", async (t) => {
     newUserID = 158;
     // Kαλώ την συνάρτηση  
    const User = await userUserIdPersonalDetailsPOST(mockUser,newUserID);

    // ελεγχος αν οι τιμές είναι truthy
    t.truthy(User.Name); 
    t.truthy(User.Surname);
    t.truthy(User.Age);
    t.truthy(User.Goal);
    t.truthy(User.Weight);
    t.truthy(User.email);
    t.truthy(User.Mobilenumber);

    // ελεγχος αν οι τιμές είναι όντως αυτές
    t.is(User.Name, "Name"); 
    t.is(User.Age, 10);
    t.is(User.Goal, "Goal");
});

// Ελεγχος των headers οτι περιέχουν content type 
test("Post/ PersonalDetails function returns correct headers", async (t) => {

    const { headers, statusCode } = await t.context.got.post(`user/${mockUser.UserId}/PersonalDetails`, {
        json: mockUser.PersonalDetails,  
    });

   // console.log(headers);
    t.is(statusCode, 200, 'Should return 200 ');
    t.truthy(headers['content-type'], );
    //header (content-type) που δηλώνει τη μορφή των δεδομένων στην απόκριση.
});




    


   
    

    

    



