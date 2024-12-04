const test = require('ava');
const http = require('http');
const listen = require('test-listen');
const got = require('got');
const app = require('./index');



test.before(async t => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: 'json',
    throwHttpErrors: false
  });
});

test.after.always(t => {
  t.context.server.close();
});

test('example test', t => {
  t.pass(); 
});

test('Discount for referring new friends', async t => {
  const { body, statusCode } = await t.context.got.get('user/123/referral');
  t.is(statusCode, 200);
  t.is(body.success, true);
  t.is(body.message, 'Discount applied successfully');
  t.is(body.redirect, 'Home Page');
});

test('Referral code only works for new members', async t => {
  const { body, statusCode } = await t.context.got.get('user/nonNumericUserID/referral');
  t.is(statusCode, 400);
  t.is(body.success, false);
  t.is(body.message, 'Referral code can be claimed only for new members');
  t.is(body.redirect, 'Home Page'); 
});

