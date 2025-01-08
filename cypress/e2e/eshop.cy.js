describe(" GET /Eshop", () => {
    /**
     * Ανοίγω το SwaggerHub UI
     */
    beforeEach(() => {
      cy.visit("/docs/");
    });
  
//Ελέγχω αν υπάρχει το κουμπί "eshop" και κάνω click, 
//στη συνέχεια ελέγχω αν υπάρχει το κουμπί "Try it out" και το πατάω,
//ελέγχω αν υπάρχει το κουμπί "Execute" και το πατάω,
// Τέλος εντοπίζω το Response
    it("Checks if the GET /eshop endpoint exists and response", () => {
  
    cy.contains('Eshop').should('be.visible').click();

    cy.contains("Try it out").should("exist").should("be.visible").click();
    
    cy.contains("Execute").should("exist").should("be.visible").click();
  
    cy.contains("Response").should("exist");

    });

//Ελέγχω αν υπάρχει το κουμπί "eshop" κάνω click, 
//στη συνέχεια ελέγχω αν υπάρχει το κουμπί "Try it out" και το πατάω,
//ελέγχω αν υπάρχει το κουμπί "Execute" και το πατάω,
//Τέλος εντοπίζω το Response να είναι 200 και ότι έχω πρόσβαση στο eshop
    it("Checks if the GET /eshop endpoint exists and then I have to see it", () => {
         
        cy.contains('Eshop').should('be.visible').click();

        cy.contains("Try it out").click();

        cy.contains("Execute").click();

        cy.contains("200").should("be.visible");
        cy.contains("Access to e-shop granted").should("exist");

        cy.contains("Response body").should("exist");
        cy.contains("can't parse JSON").should("be.visible");
        cy.contains("http://example.com/aeiou").should("exist");
      
    }); 
});