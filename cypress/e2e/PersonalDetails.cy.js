describe("EnerGym API: POST /user/{UserId}/PersonalDetails", () => {
    /**
     * Ανοίγω το SwaggerHub UI
     */
    beforeEach(() => {
      cy.visit("/docs/");
    });
// Ελέγχω ότι υπάρχουν τα προσωπικά στοιχεία και μπορώ να δώ όλα τα πεδία 
    it('Checks if the PersonalDetails endpoint exists', () => {
      cy.contains('PersonalDetails').should('be.visible');
  
      cy.contains('PersonalDetails').click();
  
      cy.contains('Name').should('be.visible');
      cy.contains('Surname').should('be.visible');
      cy.contains('Age').should('be.visible');
      cy.contains('email').should('be.visible');
      cy.contains('Weight').should('be.visible');
      cy.contains('Mobilenumber').should('be.visible');
    });
  
// Ελέγχω οτι υπάρχουν τα προσωπικά στοιχεία και το πατάω,
//στη συνέχεια πατάω το Try it out και βλέπω ότι το κουμπί αλλάζει σε cancel.
    it("Checks if 'Try it out' button is clickable", () => {
      cy.contains('PersonalDetails').click();
  
      cy.contains('Try it out').should('be.visible').click();
  
      cy.contains('Cancel').should('be.visible');
    });
  
//Ελέγχω οτι υπάρχουν τα προσωπικά στοιχεία και το πατάω,
//στη συνέχεια πατάω το Try it out και βλέπω ότι υπάρχει το userid,
//Τέλος εισάγω δεδομένα στο πεδίο UserId
    it("Checks if UserId input is visible and editable", () => {
      cy.contains('PersonalDetails').click();
      cy.contains('Try it out').click();
  
      cy.get('[placeholder="UserId - ID of the user"]').should('be.visible');
  
      cy.get('[placeholder="UserId - ID of the user"]').type('12345').should('have.value', '12345');
    });
  
  
//Ελέγχω οτι υπάρχουν τα προσωπικά στοιχεία και το πατάω,
//στη συνέχεια πατάω το Try it out και μετά το κουμπί Execute,
//τέλος επαληθεύω ότι εμφανίζονται αποτελέσματα
    it("Checks if the Execute button is clickable", () => {
      cy.contains('PersonalDetails').click();
      cy.contains('Try it out').click();
  
      cy.get(".btn.execute").should('be.visible').click();
  
      cy.get(".responses-wrapper").should('be.visible');
    });
    
//Ελέγχω οτι υπάρχουν τα προσωπικά στοιχεία και το πατάω,
//στη συνέχεια πατάω το Try it out και μετά το κουμπί Execute,
//Τέλος ελεγχω ότι η ενότητα Response εμφανίζεται και περιέχει status code
    it("Checks if response section is displayed after Execute", () => {
        cy.contains('PersonalDetails').click();
        cy.contains('Try it out').click();
      
        cy.get('[placeholder="UserId - ID of the user"]').type('12345');
      
        cy.get(".btn.execute").click();
      
        cy.get(".responses-wrapper").should('be.visible');
      
        cy.get(".responses-wrapper").contains("200").should('be.visible');
      });
      
      
  });
