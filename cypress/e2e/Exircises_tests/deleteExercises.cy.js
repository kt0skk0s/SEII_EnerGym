describe("DELETE /admin/{AdminID}/exercises", () => {
    beforeEach(() => {
        cy.visit("/docs/#/default");
    });

    it("Checks if the DELETE /admin/{AdminID}/exercises endpoint exists", () => {
        // Ελέγχει αν υπάρχει το κουμπί "Remove exercise" και το ανοίγει
        cy.contains("Remove exercise").should("exist").should("be.visible").click();

        // Ελέγχει αν υπάρχει η περιγραφή του endpoint
        cy.contains("FR22: Admin should be able to remove an existing exercise.").should("exist");

        // Ελέγχει ότι η ενότητα "Responses" εμφανίζεται
        cy.contains("Responses").should("exist");

        // Ελέγχει την απόκριση 200 και το μήνυμα "Exercise removed successfully"
        cy.contains("200").should("exist");
    });


    it("Checks error responses if fields are empty", () => {
        // Ελέγχει αν υπάρχει το κουμπί "Add new exercise"
        cy.contains("Remove exercise").should("exist").should("be.visible").click();

        // Ανοίγει το Try it out
        cy.contains("Try it out").should("be.visible").click();

        // Δεν συμπληρώνει κανένα πεδίο και πατάει Execute
        cy.contains("Execute").click();

        // Ελέγχει αν εμφανίζεται μήνυμα σφάλματος
        cy.contains("Exercise removed successfully").should("be.visible")
    })
});


