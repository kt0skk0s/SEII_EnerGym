const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index'); 

const {adminAdminIDAddGroupExerciseSchedulePOST ,adminAdminIDEditGroupExerciseSchedulePUT,adminAdminIDRemoveGroupExerciseScheduleDELETE } = require('../service/groupExerciseScheduleService.js');



test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
  }); 
  
test.after((t) => {
    t.context.server.close();
}); 


const emptySlot = { Name: '', Date: '', Time: '', Availability: false };
const nonemptySlot = { Name: 'Smth', Date: 'Smth', Time: 'Smth', Availability: false };

const mockGroupExeciseShedule1 = [ // θα ειναι ενας πίνακας 5*8 για τις 5 μερες τις βδομαδας και για 8 ώρες
    [   //Δευτέρα
        { Name: "TRX", Date: "2024-12-16", Time: "08:00", Availability: true },
        { Name: "Yoga", Date: "2024-12-16", Time: "09:00", Availability: false },
        { Name: "Pilates", Date: "2024-12-16", Time: "10:00", Availability: true },
        { Name: "Yoga", Date: "2024-12-16", Time: "11:00", Availability: true },
        { Name: "TRX", Date: "2024-12-16", Time: "12:00", Availability: false },
        { Name: "TRX", Date: "2024-12-16", Time: "13:00", Availability: false },
        { Name: "Boxing", Date: "2024-12-16", Time: "14:00", Availability: true },
        { Name: "Boxing", Date: "2024-12-16", Time: "15:00", Availability: true },
    ],

    [   //Τριτη
        { Name: "Yoga", Date: "2024-12-17", Time: "08:00", Availability: true },
        { Name: "Yoga", Date: "2024-12-17", Time: "09:00", Availability: true },
        { Name: "Pilates", Date: "2024-12-17", Time: "10:00", Availability: true },
        { Name: "TRX", Date: "2024-12-17", Time: "11:00", Availability: false },
        { Name: "TRX", Date: "2024-12-17", Time: "12:00", Availability: true },
        { Name: "Boxing", Date: "2024-12-17", Time: "13:00", Availability: true },
        { Name: "Boxing", Date: "2024-12-17", Time: "14:00", Availability: false },
        { Name: "Yoga", Date: "2024-12-17", Time: "15:00", Availability: true },

    ],
    
    // και για τις άλλες μέρες
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
]   

const mockGroupExeciseSheduleEmpty = [ // θα ειναι ενας πίνακας 5*8 για τις 5 μερες τις βδομαδας και για 8 ώρες
  
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],
    [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot,emptySlot, emptySlot, emptySlot],

]   

const mockGroupExeciseShedule2 = [ 
    [   //Δευτέρα
        { Name: "TRX", Date: "2024-12-16", Time: "08:00", Availability: true },
        { Name: "Yoga", Date: "2024-12-16", Time: "09:00", Availability: false },
        { Name: "Pilates", Date: "2024-12-16", Time: "10:00", Availability: true },
        { Name: "Yoga", Date: "2024-12-16", Time: "11:00", Availability: true },
        { Name: "TRX", Date: "2024-12-16", Time: "12:00", Availability: false },
        { Name: "TRX", Date: "2024-12-16", Time: "13:00", Availability: false },
        { Name: "Boxing", Date: "2024-12-16", Time: "14:00", Availability: true },
        { Name: "Boxing", Date: "2024-12-16", Time: "15:00", Availability: true },
    ],
]

const mockGroupExeciseShedule3 = [ // θα ειναι ενας πίνακας 5*8 για τις 5 μερες τις βδομαδας και για 8 ώρες

    [   //Δευτέρα
        { Name: "TRX", Date: "2024-12-16", Time: "08:00", Availability: true },
        { Name: "Pilates", Date: "2024-12-16", Time: "10:00", Availability: true },
        { Name: "Pilates", Date: "2024-12-16", Time: "10:00", Availability: true },
        { Name: "Yoga", Date: "2024-12-16", Time: "11:00", Availability: true },
        { Name: "TRX", Date: "2024-12-16", Time: "12:00", Availability: false },
        { Name: "TRX", Date: "2024-12-16", Time: "13:00", Availability: false },
        { Name: "Boxing", Date: "2024-12-16", Time: "14:00", Availability: true },
        { Name: "Boxing", Date: "2024-12-16", Time: "15:00", Availability: true },
    ],

    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
]

const AdminID1 = 1;
const AdminID2 = 2;



test('POST / returns success message', async (t) => {

    const response = await t.context.got.post(`admin/${AdminID1}/addGroupExerciseSchedule`, {
        json: mockGroupExeciseShedule1, // Στέλνουμε τον πίνακα 5x8
    });

    // Έλεγχος για τον σωστό κωδικό HTTP
    t.is(response.statusCode, 200, 'Should return 200');

mockGroupExeciseShedule1.forEach((day, dayIndex) => {
    day.forEach((slot, slotIndex) => {
        // Έλεγχος ότι το slot δεν είναι null ή undefined
        t.truthy(slot, `Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should not be null`);

        // Έλεγχος ότι το Name, Date,Time δεν είναι κενες συμβολοσειρά
        t.truthy(slot.Name,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a valid Name`);
        t.truthy( slot.Date,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a valid Date`);
        t.truthy( slot.Time,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a valid Time`);
    });
});


});

test('POST / returns success message for checking falsy values', async (t) => {

    const response = await t.context.got.post(`admin/${AdminID1}/addGroupExerciseSchedule`, {
        json: mockGroupExeciseSheduleEmpty, // Στέλνουμε τον πίνακα 5x8 με falsy slots
       // throwHttpErrors: false, // Για να μη σπάσει το test αν επιστρέψει 400
    });

    // Έλεγχος για τον σωστό κωδικό HTTP
    t.is(response.statusCode, 400, 'Should return 400 for schedule with all falsy slots');

    mockGroupExeciseSheduleEmpty.forEach((day, dayIndex) => {
        day.forEach((slot, slotIndex) => {
            // Ελέγχουμε τα πεδία του slot
            t.falsy( slot.Name,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a falsy Name`);
            t.falsy(slot.Date,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a falsy Date`);
            t.falsy(slot.Time,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a falsy Time`);
            t.falsy(slot.Availability,`Slot at day ${dayIndex + 1}, hour ${slotIndex + 1} should have a falsy Availability`);
        });
    });
});


test('POST/  400 beacuse of nulls at mock3', async (t) => {

    const response = await t.context.got.post(`admin/${AdminID1}/addGroupExerciseSchedule`, {
        json: mockGroupExeciseShedule3, // Στέλνουμε τον πίνακα 5x8
    });

    // Έλεγχος για τον σωστό κωδικό HTTP
    t.is(response.statusCode, 400, 'Should return 200');


});

test('POST / rejects invalid schedule (not 5x8)', async (t) => {

    const response = await t.context.got.post(`admin/${AdminID2}/addGroupExerciseSchedule`, {
        json: mockGroupExeciseShedule2, // Στέλνουμε το mock2 που δεν είναι 5x8
    });

    // Έλεγχος για τον κωδικό HTTP 400
    t.is(response.statusCode, 400, 'Should return 400 for invalid schedule');
});


test("POST function generates correct values for one day", async (t) => {
    
    // Κλήση της συνάρτησης
    const generatedSchedule = await adminAdminIDAddGroupExerciseSchedulePOST([], AdminID1);

    // Επιλέγουμε την πρώτη ημέρα (π.χ., Δευτέρα)
    const firstDay = generatedSchedule[0]; // Μία ημέρα με 8 slots

    // Έλεγχος για κάθε slot της ημέρας
    const expectedSlots = [
        { Name: "Exercise 1-1", Date: "2024-12-16", Time: "8:00", Availability: true }, // Placeholder availability
        { Name: "Exercise 1-2", Date: "2024-12-16", Time: "9:00", Availability: true },
        { Name: "Exercise 1-3", Date: "2024-12-16", Time: "10:00", Availability: true },
        { Name: "Exercise 1-4", Date: "2024-12-16", Time: "11:00", Availability: true },
        { Name: "Exercise 1-5", Date: "2024-12-16", Time: "12:00", Availability: true },
        { Name: "Exercise 1-6", Date: "2024-12-16", Time: "13:00", Availability: true },
        { Name: "Exercise 1-7", Date: "2024-12-16", Time: "14:00", Availability: true },
        { Name: "Exercise 1-8", Date: "2024-12-16", Time: "15:00", Availability: true },
    ];

    // Έλεγχος για κάθε slot
    firstDay.forEach((slot, slotIndex) => {

        t.is(slot.Name,expectedSlots[slotIndex].Name,`Slot ${slotIndex + 1} name should be ${expectedSlots[slotIndex].Name}`);
        t.is(slot.Date,expectedSlots[slotIndex].Date,`Slot ${slotIndex + 1} date should be ${expectedSlots[slotIndex].Date}`);
        t.is(slot.Time,expectedSlots[slotIndex].Time,`Slot ${slotIndex + 1} time should be ${expectedSlots[slotIndex].Time}`);
        t.true(typeof slot.Availability === "boolean",`Slot ${slotIndex + 1} availability should be a boolean`);
    });
});

/**
* γενικά λόγια για το GroupExerciseSchedule, θεωρώ ότι κάθε βδομαδα κάνει add ενα schudule που εμφανιζεται στο UI του χρηστη
* οταν θέλει να κάνει καποια αλλαγη το μόνο που αλλάζει ειναι τα ονόματα των ασκήσεων π.χ οτι θα την συγκεκριμμενη ημερομηνια-ωρα
* δεν θα γινει η yoga και θα γινει μαθημα boxing
 **/

test('PUT/ Update returns success message', async (t) => {

    //εδώ ο admin κάνει μια αλλαγή
    change = "Boxing"
    if(mockGroupExeciseShedule1[0][1].Name !==change) {
        mockGroupExeciseShedule1[0][1].Name = change;
    }


    const {statusCode} = await t.context.got.put(`admin/${AdminID2}/editGroupExerciseSchedule`, {
        json: mockGroupExeciseShedule1,
    });

    t.is(statusCode, 200, 'Should return 200');

   t.is(mockGroupExeciseShedule1[0][1].Name,"Boxing", 'Slot name at Monday 09:00 should be updated to "Boxing"');

});

test('DELETE/ Call DELETE function to ensure it resolves correctly', async (t) => {
    // Κλήση της συνάρτησης
    const deleted = await adminAdminIDRemoveGroupExerciseScheduleDELETE(AdminID1,mockGroupExeciseShedule2);

    // Έλεγχος ότι η συνάρτηση ολοκληρώθηκε επιτυχώς
    t.truthy(deleted, 'Function should resolve successfully');

    t.is(deleted.length, 5, 'Schedule should have 5 days');
    deleted.forEach((day, dayIndex) => {
        t.is(day.length, 8, `Day ${dayIndex + 1} should have 8 slots`);
        day.forEach((slot, slotIndex) => {
            t.falsy(slot.Name, `Should be null`);
            t.falsy(slot.Date, `Should be null`);
            t.falsy(slot.Time, `Should be null`);
            t.falsy(slot.Availability, `Should be null`);
        });
    });
});

/*
test('EDIT / calling function - returns success message', async (t) => {


    const result = await adminAdminIDEditGroupExerciseSchedulePUT(AdminID2);

    const {statusCode} = await t.context.got.put(`admin/${AdminID2}/editGroupExerciseSchedule`, {
        json: result,
    });

    console.log(result);
});
*/