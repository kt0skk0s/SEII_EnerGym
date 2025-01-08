describe(" GET /Eshop", () => {
    /**
     * Opens SwaggerHub UI
     */

    beforeEach(() => {
      cy.visit("/docs/");
    });
  
/*     
* Ελέγχω αν υπάρχει το κουμπί "eshop" και κάνω click, 
*στη συνέχεια ελέγχω αν υπάρχει το κουμπί "Try it out" και το πατάω,
*ελέγχω αν υπάρχει το κουμπί "Execute" και το πατάω,
* Τέλος εντοπίζω το Response
*/

it("Checks if the GET /eshop endpoint exists and response", () => {
  
  cy.contains('Eshop').should('be.visible').click();

  cy.contains("Try it out").should("exist").should("be.visible").click();
  
  cy.contains("Execute").should("exist").should("be.visible").click();

  cy.contains("Response").should("exist");

  });


    it("Checks the UI", () => {
        // Checks if the GET /eshop endpoint exists  
        cy.contains('Eshop').should('be.visible').click();

        // Πατάει Try it out
        cy.contains("Try it out").click();

        // Πατάει Execute
        cy.contains("Execute").click();

        // Ελέγχει ότι ο server επιστρέφει status code 200
        cy.contains("200").should("be.visible");
        cy.contains("Access to e-shop granted").should("exist");

        // Ελέγχει αν το response body περιέχει τη σωστή πληροφορία
        cy.contains("Response body").should("exist");
        cy.contains("can't parse JSON").should("be.visible");
        cy.contains("http://example.com/aeiou").should("exist");
      
    }); 
});