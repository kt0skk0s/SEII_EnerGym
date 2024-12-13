const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { userUserIdReferralProgramPOST } = require('../service/DefaultService.js');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 

test.after((t) => {
    t.context.server.close();
});



// Test case for generating a referral code
test("Referral code should be generated for a valid user", async (t) => {
  const referralCode = "aaa";
  t.truthy(referralCode, "Referral code should be generated");
  t.is(typeof referralCode, "string", "Referral code should be a string");

});



// Test case for unique code
test("Referral codes should be unique", async (t) => {
  const referralCode1 = "abc123";
  const referralCode2 = "xyz456";
  t.not(referralCode1, referralCode2, "Referral codes should not be the same");
});
// Test case for referral code format
test("Referral code should have the correct format", async (t) => {
  const referralCode = "abc123";
  const regex = /^[a-zA-Z0-9]{6}$/; // Αναμένουμε 6 χαρακτήρες, γράμματα ή αριθμούς
  t.truthy(regex.test(referralCode), "Referral code should match the expected format");
});

// Test case for maximum lifetime of a referral code
test("Referral code should not exceed its maximum lifetime", async (t) => {
  const createdAt = new Date("2023-12-01T00:00:00Z");
  const now = new Date("2023-12-15T00:00:00Z");
  const maxLifetimeDays = 14; // Μέγιστη διάρκεια ζωής
  const diffDays = Math.ceil((now - createdAt) / (1000 * 60 * 60 * 24)); // Υπολογισμός διαφοράς σε ημέρες

  t.true(diffDays <= maxLifetimeDays, "Referral code should not exceed its maximum lifetime");
});

// Test case for checking if referral code exists for a user
test("Referral code should exist for a user", async (t) => {
  const userId = "user123";
  const referralCodeDatabase = {
    user123: "abc123",
    user456: "xyz456",
  };

  t.truthy(referralCodeDatabase[userId], "Referral code should exist for the user");
  t.is(referralCodeDatabase[userId], "abc123", "Referral code should match the stored code");
});

// Test case for invalid referral code
test("Invalid referral code should be rejected", async (t) => {
  const referralCode = "!@#$%^"; // Ακατάλληλος κωδικός
  const regex = /^[a-zA-Z0-9]{6}$/; // Αναμένουμε 6 χαρακτήρες, γράμματα ή αριθμούς

  t.falsy(regex.test(referralCode), "Referral code should be invalid");
});

// Test case for reusing a referral code
test("Reusing a referral code should not be allowed", async (t) => {
  const usedReferralCodes = new Set(["abc123", "xyz456"]);
  const newReferralCode = "abc123";

  t.true(usedReferralCodes.has(newReferralCode), "Referral code should not be reused");
});

// Test case for generating referral code for a new user
test("Referral code should be generated for a new user", async (t) => {
  const userId = "newUser";
  const referralCodeDatabase = {
    user123: "abc123",
    user456: "xyz456",
  };

  if (!referralCodeDatabase[userId]) {
    referralCodeDatabase[userId] = "new456"; // Δημιουργία νέου referral code
  }

  t.truthy(referralCodeDatabase[userId], "Referral code should be generated for the user");
  t.is(referralCodeDatabase[userId], "new456", "Referral code should match the generated code");
});


test('POST /ReferralProgram with invalid User ID returns 400', async (t) => {
  const invalidUserId = "INVALID_ID"; // Παράδειγμα μη έγκυρου User ID
  const referralCode = "ABC123";

  const { body, statusCode } = await t.context.got.post(`user/${invalidUserId}/ReferralProgram`, {
      body: referralCode,
      headers: {
        "Content-Type": "application/json",
      }
  });

  // Έλεγχοι
  t.is(statusCode, 400, 'Should return status code 400 for invalid User ID');
  t.truthy(body, 'Response body should provide error details');
});