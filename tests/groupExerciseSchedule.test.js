const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index'); 

const { adminAdminIDAddGroupExerciseSchedulePOST, adminAdminIDEditGroupExerciseSchedulePUT } = require('../service/DefaultService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 
  
test.after((t) => {
    t.context.server.close();
}); 


// Mock admin:

const mockAdmin1 = {
    name: "Thodoris",
    adminID: "12345",
    groupExSchedule: {
        title: "Yoga",
        daysTime: [
            "Monday 6-7 PM",
            "Wednesday 5-6 PM",
            "Friday 7-8 PM"
        ]
    }
}


test('POST/ Successful group exercise upload', t => {
    t.true(typeof mockAdmin1.adminID === 'string', 'adminID should be a string');
    t.truthy(mockAdmin1.adminID, 'adminID should not be empty');
    t.true(Array.isArray(mockAdmin1.groupExSchedule.daysTime), 'Group Exercise Schedule should be an array');
    t.truthy(mockAdmin1.groupExSchedule, 'Group Exercise Schedule should not be empty');
    adminAdminIDAddGroupExerciseSchedulePOST(mockAdmin1.groupExSchedule, mockAdmin1.adminID);
});

test('PUT/ Successful group exercise edit', t => {
    t.true(typeof mockAdmin1.adminID === 'string', 'adminID should be a string');
    t.truthy(mockAdmin1.adminID, 'adminID should not be empty');
    t.true(Array.isArray(mockAdmin1.groupExSchedule.daysTime), 'Group Exercise Schedule should be an array');
    t.truthy(mockAdmin1.groupExSchedule, 'Group Exercise Schedule should not be empty');
    adminAdminIDEditGroupExerciseSchedulePUT(mockAdmin1.groupExSchedule, mockAdmin1.adminID);
});