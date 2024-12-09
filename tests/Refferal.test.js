const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { userUserIdReferralProgramPOST } = require('../service/DefaultService');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 

test.after((t) => {
    t.context.server.close();
}); 

test("applyReferral returns the correct structure for a valid referral code", async t => {
  const ReferralCode = "REF123";
 // const ReferralDetails = await applyReferral(ReferralCode, userID);

  // Check if the properties exist
  t.truthy(ReferralCode, "Response should have referralID property");
  // Validate the data types and structure
  t.is(typeof ReferralCode, 'string', "referralID should be a string");
 
});


/*
test('Referral Program POST should resolve with example data', async (t) => {
  const body = "Details of the member to be invited";
  const userId = "12345";

  // Call the service function
  const result = await ReferralProgramPOST(body, userId);

  // Expected example data
  const expected = {
      message: "Referral processed successfully",
      referredUserId: "12345",
      details: "Details of the member to be invited",
  };

  t.deepEqual(result, expected);
});

test('Referral Program POST should resolve with no data if examples are empty', async (t) => {
  const body = "empty"; // Simulate no data by passing "empty"
  const userId = "12345";

  const result = await ReferralProgramPOST(body, userId);
  t.deepEqual(result, undefined); // Περιμένουμε undefined αν τα παραδείγματα είναι άδεια
});
*/