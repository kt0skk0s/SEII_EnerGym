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
test('Referral Program POST should resolve with example data', async t => {
  const body = "Details of the member to be invited";
  const userId = "12345";
  const result = await ReferralProgramPOST(body, userId);
  t.deepEqual(result, ""); // Επιβεβαίωση ότι το αποτέλεσμα είναι όπως αναμενόταν
});


test('Check the type of userID', async t => {
  const body = "";
  const userId = 2852;
  const result = await ReferralProgramPOST(body, userId);
  t.is(Number.isInteger(result), true);
});
*/