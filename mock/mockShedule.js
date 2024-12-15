const nonemptySlot = { Name: 'Smth', Date: 'Smth', Time: 'Smth', Availability: false };
const mockGroupExeciseShedule = [ // θα ειναι ενας πίνακας 5*8 για τις 5 μερες τις βδομαδας και για 8 ώρες
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
    
    // και για τις άλλες μέρες
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
    [nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot, nonemptySlot],
]

module.exports = mockGroupExeciseShedule;
