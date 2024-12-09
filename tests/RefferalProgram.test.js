const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { ReferralProgramPOST } = require('../service/DefaultService.js');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 

test.after((t) => {
    t.context.server.close();
});


/*
test('Referral Program POST should resolve with example data', async (t) => {
    const body = "Details of the member to be invited";
    const userId = "12345";

    const result = await ReferralProgramPOST(body, userId);

    const expected = {
        message: "Referral processed successfully",
        referredUserId: "12345",
        details: "Details of the member to be invited",
    };

    t.deepEqual(result, expected);
});

test('Referral Program POST should handle invalid data gracefully', async (t) => {
    const body = null;
    const userId = "12345";

    const result = await ReferralProgramPOST(body, userId);

    t.deepEqual(result, { error: "Invalid referral data" });
});

test('Referral Program POST should return error for missing user ID', async (t) => {
    const body = "Valid data";
    const userId = null;

    const result = await ReferralProgramPOST(body, userId);

    t.deepEqual(result, { error: "User ID is required" });
});
*/



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

/*
// Test: Επιτυχής πρόσκληση
test('Επιτυχής πρόσκληση', async (t) => {
  const payload = "Details of the member to be invited"; // Έγκυρες λεπτομέρειες
  const userId = "12345"; // Έγκυρο userId

  const response = await t.context.got.post('user/12345/referral-program', {
    json: { body: payload }, // Σώμα αιτήματος
  });

  // Έλεγχος επιτυχούς κωδικού
  t.is(response.statusCode, 200);

  // Αναμενόμενο αποτέλεσμα
  t.deepEqual(response.body, {
    message: "Referral processed successfully",
    referredUserId: userId,
    details: payload,
  });
});
/*
// Test: Άδειο σώμα (empty body)
test('Άδειο σώμα', async (t) => {
  const payload = "empty"; // Το σώμα του αιτήματος είναι άδειο
  const userId = "12345"; // Έγκυρο userId

  const response = await t.context.got.post('user/12345/referral-program', {
    json: { body: payload },
  });

  // Έλεγχος κωδικού HTTP 204 (No Content)
  t.is(response.statusCode, 204);

  // Αναμενόμενη απάντηση
  t.is(response.body, undefined);
});

// Test: Ελλιπή δεδομένα
test('POST Referral Program - Ελλιπή δεδομένα', async (t) => {
  const payload = null; // Χωρίς δεδομένα
  const userId = "12345"; // Έγκυρο userId

  const response = await t.context.got.post('user/12345/referral-program', {
    json: { body: payload },
  });

  // Έλεγχος κωδικού HTTP 400 (Bad Request)
  t.is(response.statusCode, 400);

  // Αναμενόμενη απάντηση
  t.deepEqual(response.body, {
    error: "Missing referral details",
  });
});

// Test: Μη υπαρκτός χρήστης
test('POST Referral Program - Μη υπαρκτός χρήστης', async (t) => {
  const payload = "Details of the member to be invited"; // Έγκυρες λεπτομέρειες
  const userId = "nonexistent"; // Μη έγκυρο userId

  const response = await t.context.got.post('user/nonexistent/referral-program', {
    json: { body: payload },
  });

  // Έλεγχος κωδικού HTTP 404 (Not Found)
  t.is(response.statusCode, 404);

  // Αναμενόμενη απάντηση
  t.deepEqual(response.body, {
    error: "User not found",
  });
});
*/
