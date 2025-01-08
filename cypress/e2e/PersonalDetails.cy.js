describe("EnerGym API: POST /user/{UserId}/PersonalDetails", () => {
    /**
     * Opens SwaggerHub UI
     */
    beforeEach(() => {
      cy.visit("/docs/");
    });

  // Ελέγχος ότι υπάρχουν τα προσωπικά στοιχεία και ότι μπορώ να δώ όλα τα πεδία 
    it('Checks if the PersonalDetails endpoint exists', () => {
      cy.contains('PersonalDetails').should('be.visible');
  
      // Κάνε κλικ στο PersonalDetails
      cy.contains('PersonalDetails').click();
  
      cy.contains('Name').should('be.visible');
      cy.contains('Surname').should('be.visible');
      cy.contains('Age').should('be.visible');
      cy.contains('email').should('be.visible');
      cy.contains('Weight').should('be.visible');
      cy.contains('Mobilenumber').should('be.visible');
    });
  
    /**
     * Checks if 'Try it out' button is clickable
     */

    it("Checks if 'Try it out' button is clickable", () => {
      cy.contains('PersonalDetails').click();
  
      cy.contains('Try it out').should('be.visible').click();  // Έλεγχος ότι το κουμπί Try it out υπάρχει
      cy.contains('Cancel').should('be.visible');  // Έλεγχος ότι το κουμπί άλλαξε σε Cancel

    });
  
    /**
     * Checks if UserId input is visible and editable
     */

    it("Checks if UserId input is visible and editable", () => {
      cy.contains('PersonalDetails').click();
      cy.contains('Try it out').click();
  
      cy.get('[placeholder="UserId - ID of the user"]').should('be.visible'); // Έλεγχος ότι το πεδίο UserId είναι ορατό
      cy.get('[placeholder="UserId - ID of the user"]').type('12345').should('have.value', '12345');   // Έλεγχος δεδομένα στο πεδίο UserId

    });
  
  
    /**
     * Checks if the Execute button is clickable
     */

    it("Checks if the Execute button is clickable", () => {
      cy.contains('PersonalDetails').click();
      cy.contains('Try it out').click();
  
      
      cy.get(".btn.execute").should('be.visible').click(); // Έλεγχος ότι το κουμπί Execute υπάρχει και είναι clickable
      cy.get(".responses-wrapper").should('be.visible');   // Έλεγχος ότι εμφανίζονται αποτελέσματα

    });
    


    it("Checks if response section is displayed after Execute", () => {
        cy.contains('PersonalDetails').click();
        cy.contains('Try it out').click();
      
        cy.get('[placeholder="UserId - ID of the user"]').type('12345'); // Εισάγει δεδομένα στο πεδίο UserId
        cy.get(".btn.execute").click(); // Πατάει το κουμπί Execute
        cy.get(".responses-wrapper").should('be.visible');   // Ελέγχος ότι η ενότητα Response εμφανίζεται
        cy.get(".responses-wrapper").contains("200").should('be.visible');  // Ελέγχος αν η ενότητα περιέχει status code (200 ή άλλο)

      });
      
      
  });
  
      
      
      
  