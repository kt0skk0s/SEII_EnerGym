const test = require('ava').default; 
const got = require('got'); 
const http = require('http'); 
const listen = require('test-listen'); 

const app = require('../index.js');
const { eshopGET } = require('../service/DefaultService.js');


const ESHOP_URL = "https://www.example-eshop.com";

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 

test.after((t) => {
    t.context.server.close();
});

test('eShop URL should be valid and accessible', async (t) => {
    try {
        const response = await got(ESHOP_URL);
        
        // Check if the response is successful
        t.is(response.statusCode, 200, "eShop should return HTTP 200 OK");

        // Check if the URL is using HTTPS
        t.truthy(ESHOP_URL.startsWith("https://"), "eShop URL should use HTTPS");
    } catch (error) {
        t.fail(`eShop URL is not accessible: ${error.message}`);
    }
});

test('eShop URL should not return 404 error', async (t) => {
    try {
        const response = await got(ESHOP_URL);
        
        // Ensure the response is not 404
        t.not(response.statusCode, 404, "eShop should not return 404 Not Found");
    } catch (error) {
        t.fail(`eShop URL test failed: ${error.message}`);
    }
});

test('eShop URL should be correctly formatted', (t) => {
    // Simple URL validation using a regex
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;
    t.truthy(urlRegex.test(ESHOP_URL), "eShop URL should be a valid URL");
});
