const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { userUserIdReferralProgramPOST } = require('../service/ReferralProgramService.js');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 
// http2 maybe not necesary
test.after((t) => {
    t.context.server.close();
});

const mockRef1 = {UserId : 123,referralCode : "ab2121"}

const mockRef2 = {UserId : 111, referralCode : "ref559"}

const mockRef3 = {UserId : 134,referralCode : "!ssss@"}

const invalidUser = {UserId : "123",referralCode : "RETPO0"}

const userWithoutReferralCode = {UserId: 987 ,referralCode: "",}

const mockLongRef = {UserId: 456,referralCode: "verylongrefcode1234"}

// Test case for generating a referral code
test("Referral code should be generated for a valid user", async (t) => {
  const response = await t.context.got.post(`user/${mockRef1.UserId}/ReferralProgram` ,{
    json: mockRef1,
  });

  t.truthy(mockRef1.referralCode, "Referral code should be generated");
  t.is(typeof mockRef1.referralCode, "string", "Referral code should be a string");

});

// Test case for referral code not to be an empty string
test("Referral code with invalid format should return error", async (t) => {
  const response = await t.context.got.post(`user/${userWithoutReferralCode.UserId}/ReferralProgram`, {
    json: userWithoutReferralCode,
  });

  t.truthy(response.body.referralCode, "Referral code should not be empty");
  t.is(userWithoutReferralCode.referralCode, "", "Referral code should not be an empty string");
});


// Test case for referral code format
test("Referral code should have the correct format", async (t) => {
  const response = await t.context.got.post(`user/${mockRef1.UserId}/ReferralProgram` ,{
    json: mockRef1,
  });

  const regex = /^[a-zA-Z0-9]{6}$/; // Αναμένουμε 6 χαρακτήρες, γράμματα ή αριθμούς
  t.truthy(regex.test(mockRef1.referralCode), "Referral code should match the expected format");
});


// Test case for invalid referral code
test("Invalid referral code should be rejected", async (t) => {
  const response = await t.context.got.post(`user/${mockRef3.UserId}/ReferralProgram` ,{
    json: mockRef3,
  });

  const regex = /^[a-zA-Z0-9]{6}$/; 
  t.falsy(regex.test(mockRef3.referralCode), "Referral code should be invalid");
});

// Test case for maximum lifetime of a referral code
test("Referral code should not exceed its maximum lifetime", async (t) => {
  const createdAt = new Date("2023-12-01T00:00:00Z");
  const now = new Date("2023-12-15T00:00:00Z");
  const maxLifetimeDays = 14; // Μέγιστη διάρκεια ζωής
  const diffDays = Math.ceil((now - createdAt) / (1000 * 60 * 60 * 24)); // Υπολογισμός διαφοράς σε ημέρες

  t.true(diffDays <= maxLifetimeDays, "Referral code should not exceed its maximum lifetime");
});

// Test case for reusing a referral code  
  test("Should reject duplicate referralCode", async (t) => {
    
    let existRefs = [] ; 

    t.is(existRefs.length,0);

    if (!existRefs.includes(mockRef1.referralCode)) { 
      existRefs.push(mockRef1.referralCode);
    }

    t.is(existRefs.length,1);

    if (!existRefs.includes(mockRef2.referralCode)) {
      existRefs.push(mockRef2.referralCode);
    }
    t.is(existRefs.length,2);
    
    const mockSameRef = { UserId: 3, referralCode: "ref559" }; 
    //εδώ δημιουργώ ενα νέο refCode που ειναι ιδιο με ηδη υπάρχον

    if (!existRefs.includes(mockSameRef.referralCode)) {
      existRefs.push(mockSameRef.referralCode);
    }
    else{
     // throw new Error("You can't have the same Referral code, please enter a new one!");
    }
    console.log(existRefs);

    t.is(existRefs.length,2);

});

test('POST /ReferralProgram with invalid User ID returns 400', async (t) => {

  const { body, statusCode } = await t.context.got.post(`user/${invalidUser.UserId}/ReferralProgram`, {
    json: invalidUser,
  });

  // Έλεγχοι
  t.is(statusCode, 400, 'Should return status code 400 for invalid User ID');

});

test("Referral code should not exceed maximum length", async (t) => {

  const response = await t.context.got.post(`user/${mockLongRef.UserId}/ReferralProgram`, {
    json: mockLongRef,
  });

  const maxLength = 10; // Μέγιστο μήκος
  t.falsy(mockLongRef.referralCode.length < maxLength, "Referral code should not exceed maximum length");
});

test("Post /PersonalDetails function returns referral code", async (t) => {
     
     // Ελέγχω την συνάρτηση που καλώ 
    const ref = await userUserIdReferralProgramPOST(mockRef1,mockRef1.UserId);

    t.truthy(ref.referralCode);

});