describe("DELETE /admin/{AdminID}/exercises", () => {
    /**
     * Ανοίγω το SwaggerHub UI
     */
    beforeEach(() => {
        cy.visit("/docs/#/default");
    });
// Ελέγχω κατά πόσο βρίσκει το κουμπί "Remove exercise" και το ανοίγω, 
// μετά ελέγχω αν υπάρχει η περιγραφή και στο τέλος βλέπω αν όντως διαγράφηκε η άσκηση
    it("Checks if the DELETE /admin/{AdminID}/exercises endpoint exists", () => {        
        cy.contains("Remove exercise").should("exist").should("be.visible").click();
        
        cy.contains("FR22: Admin should be able to remove an existing exercise.").should("exist");
        
        cy.contains("Responses").should("exist");

        cy.contains("200").should("exist");
    });

// Ελέγχω κατά πόσο υπάρχει το κουμπί "Remove exercise" και το πατάω , 
// ανοίγω το Try it out και μετά "Execute"
    it("Checks error responses if fields are empty", () => {

        cy.contains("Remove exercise").should("exist").should("be.visible").click();

        cy.contains("Try it out").should("be.visible").click();

        cy.contains("Execute").click();

        cy.contains("Exercise removed successfully").should("be.visible")
    })
});