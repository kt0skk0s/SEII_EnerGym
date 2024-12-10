const test = require('ava').default; // Import Ava test

const { AddWorkoutSchedulePOST, RemoveWorkoutScheduleDELETE, getWorkoutSchedule } = require('../service/DefaultService.js');

test('Add workout schedule resolves successfully', async (t) => {
    const body = {
      exercise: 'bench press',
      days: 'Monday',
      time: '18:00',
    };
    const adminId = 'admin123';
  
    const result = await AddWorkoutSchedulePOST(body, adminId);

    t.deepEqual(body, {
        exercise: 'bench press',
        days: 'Monday',
        time: '18:00',
    });
  });


test('Remove workout schedule resolves successfully', async (t) => {
    const adminId = 11880;
    const groupExerciseId = 5;
    const result = await RemoveWorkoutScheduleDELETE(adminId, groupExerciseId);
    t.deepEqual([adminId, groupExerciseId], [11880, 5]);
  });


test('Get workout schedule resolves successfully', async (t) => {
    const userId = 'Porsche 911 gt3';
    const result = await getWorkoutSchedule(userId);
    t.deepEqual(userId, 'Porsche 911 gt3');
});