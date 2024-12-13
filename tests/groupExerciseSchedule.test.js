const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index'); 


test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 
  
test.after((t) => {
    t.context.server.close();
}); 



test('POST admin/AdminID/addGroupExerciseSchedule returns success message', async (t) => {
    const mockData = [
        {
            GroupExercise: {
                Name: "Yoga",
                Date: "2025-1-25",
                Time: "10:00 AM",
                Availability: true
            }
        }
    ]
    const AdminID = 5;

    const {statusCode} = await t.context.got.post(`admin/${AdminID}/addGroupExerciseSchedule`, {
        json: mockData,
    });
    t.is(statusCode, 200, 'Should return 200');
});
