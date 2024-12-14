const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { userUserIdContractInformationGET } = require('../service/DefaultService.js');

test.before(async (t) => {
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

// Set up server
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

// Tear down server
test.after((t) => {
  t.context.server.close();
});

const validContractInfo = {
  UserId: 123,
  startingDate: "2023-01-01",
  endingDate: "2023-12-31",
  PastContracts: [
    { startingDate: "2022-01-01", endingDate: "2022-12-31" },
    { startingDate: "2021-01-01", endingDate: "2021-12-31" },
  ],
};

const invalidContractInfo = {
  UserId: "invalid-user",
  startingDate: "",
  endingDate: "",
  PastContracts: [],
};


test("Retrieve valid contract information", async (t) => {
  const response = await t.context.got.get(`user/${validContractInfo.UserId}/ContractInformation`);

  t.is(response.statusCode, 200, "Should return status 200 for valid UserId");
  });



  test("Contract dates should have the correct format", async (t) => {
    const response = await t.context.got.get(`user/${validContractInfo.UserId}/ContractInformation`);
  
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Ελέγχει μορφή YYYY-MM-DD
    const { startingDate, endingDate } = response.body;
  
    // Debugging - Εμφάνιση τιμών στο log
    console.log("Starting Date:", startingDate);
    console.log("Ending Date:", endingDate);
  
    // Έλεγχοι για τη μορφή των ημερομηνιών
    t.truthy(dateRegex.test(startingDate), "Starting date should match the expected format (YYYY-MM-DD)");
    t.truthy(dateRegex.test(endingDate), "Ending date should match the expected format (YYYY-MM-DD)");
  });
  
  
  test("Contract information should contain valid fields", async (t) => {
    const response = await t.context.got.get(`user/${validContractInfo.UserId}/ContractInformation`);
    const { startingDate, endingDate, PastContracts } = response.body;
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Έλεγχος για ύπαρξη και μορφή πεδίων
    t.true(typeof startingDate === "string", "Starting date should be a string");
    t.true(typeof endingDate === "string", "Ending date should be a string");
    t.true(Array.isArray(PastContracts), "PastContracts should be an array");
  
    // Έλεγχος για συγκεκριμένες τιμές
    t.is(PastContracts.length, 2, "PastContracts should have two entries");

    PastContracts.forEach((contract, index) => {
      t.true(typeof contract.startingDate === "string", `Starting date of past contract ${index + 1} should be a string`);
      t.true(typeof contract.endingDate === "string", `Ending date of past contract ${index + 1} should be a string`);
      t.truthy(dateRegex.test(contract.startingDate), `Starting date of past contract ${index + 1} should be in YYYY-MM-DD format`);
      t.truthy(dateRegex.test(contract.endingDate), `Ending date of past contract ${index + 1} should be in YYYY-MM-DD format`);
    });
  });
  

  test("Starting date should not be empty", async (t) => {
    const response = await t.context.got.get(`user/${validContractInfo.UserId}/ContractInformation`);
    const { startingDate } = response.body;
  
    t.not(startingDate, "", "Starting date should not be an empty string");
    t.not(startingDate, null, "Starting date should not be null");
    t.not(startingDate, undefined, "Starting date should not be undefined");
  });
 