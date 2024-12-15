function isAvailable(schedule, { name, date, time }) {
    for (const day of schedule) {
      for (const slot of day) {
        if (
          slot.Name === name &&
          slot.Date === date &&
          slot.Time === time
        ) {
          return slot.Availability; // Επιστρέφει true ή false
        }
      }
    }
    return false; // Αν δεν βρεθεί, θεωρείται μη διαθέσιμο
  }
  
  module.exports = { isAvailable };
  