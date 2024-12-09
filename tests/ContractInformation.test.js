const test = require('ava').default; // Import Ava test
const got = require('got'); // HTTP client
const http = require('http'); // HTTP server
const listen = require('test-listen'); // Test server helper

const app = require('../index.js'); // Import your app
const { ContractInformationGET } = require('../service/DefaultService.js'); // Import the service method

// Setup: Start a test server before tests
test.before(async (t) => {
  t.context.server = http.createServer(app); // Create HTTP server
  t.context.prefixUrl = await listen(t.context.server); // Get test server URL
  t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: 'json', prefixUrl: t.context.prefixUrl });
});

// Cleanup: Close the test server after tests
test.after.always((t) => {
  t.context.server.close();
});

// Test: Retrieve contract information for a valid userId
test('Retrieve contract information for valid userId', async (t) => {
  const userId = '12345';

  const result = await ContractInformationGET(userId);

  // Assert the expected response
  t.deepEqual(result, {
    statusCode: 200,
    body: {
      startingDate: '2000-01-23',
      endingDate: '2000-12-31',
      PastContracts: [
        { startingDate: '1999-01-01', endingDate: '1999-12-31' },
      ],
    },
  });
});

// Test: Retrieve contract information for a non-existent userId
test('Retrieve contract information for non-existent userId', async (t) => {
  const userId = '99999';

  const result = await ContractInformationGET(userId);

  t.deepEqual(result, {
    statusCode: 404,
    body: { error: 'User not found' },
  });
});

// Test: Retrieve contract information for an invalid userId
test('Retrieve contract information for invalid userId', async (t) => {
  const userId = 'invalidId';

  const result = await ContractInformationGET(userId);

  t.deepEqual(result, {
    statusCode: 400,
    body: { error: 'Invalid userId' },
  });
});


// Test: Retrieve contract information for a user with no contracts
test('Retrieve contract information for user with no contracts', async (t) => {
    const userId = 'userWithNoContracts';
  
    const result = await ContractInformationGET(userId);
  
    t.deepEqual(result, {
      statusCode: 200,
      body: {
        startingDate: null,
        endingDate: null,
        PastContracts: [],
      },
    });
  });
  
  // Test: Retrieve contract information for a user with multiple contracts
  test('Retrieve contract information for user with multiple contracts', async (t) => {
    const userId = 'userWithMultipleContracts';
  
    const result = await ContractInformationGET(userId);
  
    t.deepEqual(result, {
      statusCode: 200,
      body: {
        startingDate: '2023-01-01',
        endingDate: '2023-12-31',
        PastContracts: [
          { startingDate: '2022-01-01', endingDate: '2022-12-31' },
          { startingDate: '2021-01-01', endingDate: '2021-12-31' },
        ],
      },
    });
  });
  
  // Test: Retrieve contract information for a user whose contract has expired
  test('Retrieve contract information for user with expired contract', async (t) => {
    const userId = 'userWithExpiredContract';
  
    const result = await ContractInformationGET(userId);
  
    t.deepEqual(result, {
      statusCode: 200,
      body: {
        startingDate: null,
        endingDate: null,
        PastContracts: [
          { startingDate: '2022-01-01', endingDate: '2022-12-31' },
        ],
      },
    });
  });
  
  // Test: Retrieve contract information for a user with invalid contract dates
  test('Retrieve contract information for user with invalid contract dates', async (t) => {
    const userId = 'userWithInvalidDates';
  
    const result = await ContractInformationGET(userId);
  
    t.deepEqual(result, {
      statusCode: 500,
      body: { error: 'Invalid contract data' },
    });
  });
 
