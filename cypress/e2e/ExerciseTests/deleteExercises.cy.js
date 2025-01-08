describe("DELETE /admin/{AdminID}/exercises", () => {
    beforeEach(() => {
        cy.visit("/docs/#/default");
    });

    it("Checks if the DELETE /admin/{AdminID}/exercises endpoint exists", () => {
        cy.contains("Remove exercise").should("exist").should("be.visible").click(); // Ελέγχος αν υπάρχει το κουμπί "Remove exercise" και κλικ σε αυτό
        cy.contains("FR22: Admin should be able to remove an existing exercise.").should("exist"); // Ελέγχος υπάρξης περιγραφής endpoint
        cy.contains("Responses").should("exist");  // Ελέγχoς ότι η ενότητα "Responses" εμφανίζεται
        cy.contains("200").should("exist");   // Ελέγχος statuscode 200 και το μήνυμα "Exercise removed successfully"

    });


    it("Checks error responses if fields are empty", () => {
        cy.contains("Remove exercise").should("exist").should("be.visible").click();// Ελέγχος αν υπάρχει το κουμπί "Add new exercise"
        cy.contains("Try it out").should("be.visible").click();  // Ανοίγει το Try it out
        cy.contains("Execute").click();   // Ελεγχος οτι υπαρχει το κουμπι Execute και κλικ σε αυτό 
        cy.contains("Exercise removed successfully").should("be.visible") 
    })
});