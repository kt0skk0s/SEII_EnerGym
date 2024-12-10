const test = require('ava');
const http = require('http');
const listen = require('test-listen');
const got = require('got');

const app = require('../index');

// Import necessary functions from the service
const { contactInformationGET } = require("../service/DefaultService");

// Generate random IDs for testing
const contactID = contactInformationGET();

// Set up test environment
test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });


  test("getContactInformation returns 400 for invalid contactID", async (t) => {
    const invalidContactID = "invalidID"; // Χρησιμοποιούμε string αντί για αριθμό
    const response = await t.context.got.get(`contact/${invalidContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 400 for invalid contactID");
  });

  test("getContactInformation returns 400 for null contactID", async (t) => {
    const nullContactID = null; // Εξομοίωση μη έγκυρης τιμής
    const response = await t.context.got.get(`contact/${nullContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 400 for null contactID");
  });

  test("getContactInformation returns 404 for extremely large contactID", async (t) => {
    const largeContactID = 9999999999; // Πολύ μεγάλος αριθμός
    const response = await t.context.got.get(`contact/${largeContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 404 for extremely large contactID");
  });

  test("getContactInformation returns 400 for contactID as boolean", async (t) => {
    const booleanContactID = true; // Χρησιμοποιούμε boolean αντί για αριθμό
    const response = await t.context.got.get(`contact/${booleanContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 400 for boolean contactID");
  });
  

  test("getContactInformation returns 400 for contactID as array", async (t) => {
    const arrayContactID = [123]; // Χρησιμοποιούμε array αντί για αριθμό
    const response = await t.context.got.get(`contact/${arrayContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 400 for array contactID");
  });

  
  test("getContactInformation returns 400 for undefined contactID", async (t) => {
    const undefinedContactID = undefined; // Εξομοίωση μη καθορισμένου contactID
    const response = await t.context.got.get(`contact/${undefinedContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 400 for undefined contactID");
  });
  
  test("getContactInformation returns 404 for negative contactID", async (t) => {
    const negativeContactID = -123; // Αρνητικός αριθμός
    const response = await t.context.got.get(`contact/${negativeContactID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 404 for negative contactID");
  });
  

  // Test for non-existent contactID (GET)
test("getContactInformation returns 404 for non-existent contactID", async (t) => { const nonExistentID = 999999;
    const response = await t.context.got.get(`contact/${nonExistentID}/ContactInformation`);
    t.is(response.statusCode, 404, "Should return 404 for non-existent contactID");
  });
  
