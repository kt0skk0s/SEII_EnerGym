const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index'); 
const { AddWorkoutSchedulePOST } = require('../service/DefaultService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 
  
test.after((t) => {
    t.context.server.close();
});

test('POST admin/{AdminID}/AddWorkoutSchedule returns success message', async (t) => {
    const mockData = [
        {
            Workout: {}
        }
    ]
    const AdminID = 77;

    const {statusCode} = await t.context.got.post(`admin/${AdminID}/addWorkoutSchedule`, {
        json: mockData,
    });
    t.is(statusCode, 200, 'Should return 200');
});
