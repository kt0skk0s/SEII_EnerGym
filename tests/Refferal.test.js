const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index.js');
const { ReferralProgramPOST } = require('../service/DefaultService');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 

test.after((t) => {
    t.context.server.close();
}); 


test('Referral Program POST should resolve with example data', async t => {
  const body = "Details of the member to be invited";
  const userId = "12345";
  const result = await ReferralProgramPOST(body, userId);
  t.deepEqual(result, ""); // Επιβεβαίωση ότι το αποτέλεσμα είναι όπως αναμενόταν
});

test('Referral Program POST should resolve with no data if examples are empty', async t => {
  const body = "Details of the member to be invited";
  const userId = "12345";
  const result = await ReferralProgramPOST(body, userId);
  t.deepEqual(result, undefined); // Περιμένουμε undefined αν τα παραδείγματα είναι άδεια
});
