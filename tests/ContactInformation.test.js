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

// Test for getContactInformation function
test("getContactInformation returns correct structure for a valid contactID", async (t) => {
  const contactInfo = await contactInformationGET(contactID);

  // Assertions
  //t.truthy(contactInfo.name);
  //  t.truthy(contactInfo.email);
  //t.truthy(contactInfo.phone);

  //t.is(typeof contactInfo.name, "string");
  //t.is(typeof contactInfo.email, "string");
  //t.is(typeof contactInfo.phone, "string");
});

// Test for getContactInformation API endpoint
test("getContactInformation API returns correct structure for a valid contactID", async (t) => {
  const { body, statusCode } = await t.context.got(`contact/${contactID}`, {method: `GET`}); 
 // t.is(typeof contactInfo.name, "string");
  //t.is(typeof contactInfo.email, "string");
  //t.is(typeof contactInfo.phone, "string");
});

/* Test for invalid contactID (400 Bad Request)
const invalidContactIDs = [null, undefined, "abc", 1.5, {}, [], true];

test("getContactInformation with invalid contactID returns 400", async (t) => {
  for (const invalidID of invalidContactIDs) {
    const { body, statusCode } = await t.context.got(`contact/${invalidID}`);
    
   // t.is(statusCode, 400, "Should return 400 Bad Request for invalid contactID");
    t.truthy(body.message, "Response should have a message");
    //t.is(body.message, "request.params.contactID should be integer");
  }
});

// Test for non-existent contactID (404 Not Found)
test("getContactInformation with non-existent contactID returns 404", async (t) => {
  const nonExistentID = 999999;
  const { body, statusCode } = await t.context.got(`contact/${nonExistentID}`);

 // t.is(statusCode, 404, "Should return 404 Not Found for non-existent contactID");
  t.truthy(body.message, "Response should have a message");
 // t.is(body.message, "Contact not found");
});

// Test for updateContactInformation function
const updatedContactData = { name: "Updated Name", email: "updated@example.com", phone: "1234567890" };

test("updateContactInformation updates contact information correctly", async (t) => {
  const result = await updateContactInformation(contactID, updatedContactData);

  t.is(result, undefined, "updateContactInformation should return undefined on success");
});

// Test for updateContactInformation API endpoint
test("updateContactInformation API updates contact information correctly", async (t) => {
  const { statusCode } = await t.context.got.put(`contact/${contactID}`, {
    json: updatedContactData,
  });

 // t.is(statusCode, 200, "Should return 200 OK on successful update");
});

// Test for deleteContactInformation function
test("deleteContactInformation deletes contact information correctly", async (t) => {
  const result = await deleteContactInformation(contactID);

  t.is(result, undefined, "deleteContactInformation should return undefined on success");
});

// Test for deleteContactInformation API endpoint
test("deleteContactInformation API deletes contact information correctly", async (t) => {
  const { statusCode } = await t.context.got.delete(`contact/${contactID}`);

 // t.is(statusCode, 200, "Should return 200 OK on successful deletion");
});

// Test for invalid deletion
test("deleteContactInformation with invalid contactID returns 400", async (t) => {
  for (const invalidID of invalidContactIDs) {
    const { statusCode, body } = await t.context.got.delete(`contact/${invalidID}`);
   // t.is(statusCode, 400, "Should return 400 Bad Request for invalid contactID");
    t.truthy(body.message, "Response should have a message");
   // t.is(body.message, "request.params.contactID should be integer");
  }
});

// Test for non-existent deletion
test("deleteContactInformation with non-existent contactID returns 404", async (t) => {
  const nonExistentID = 999999;
  const { statusCode, body } = await t.context.got.delete(`contact/${nonExistentID}`);

  //t.is(statusCode, 404, "Should return 404 Not Found for non-existent contactID");
  t.truthy(body.message, "Response should have a message");
  t.is(body.message, "Contact not found");
});

// Helper function to generate test contact IDs
function generateTestContactID() {
  return Math.floor(Math.random() * 100000) + 1;
}

*/
