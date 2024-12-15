// ------------------------------------------ TESTS: POST /user/{UserId}/PersonalDetails ------------------------------------------ //

describe("EnerGym API: POST /user/{UserId}/PersonalDetails", () => {
    /**
     * Opens SwaggerHub UI
     */
    beforeEach(() => {
      cy.visit("/docs/");
    });
  
    it('Checks if the PersonalDetails endpoint exists', () => {
      cy.contains('PersonalDetails').should('be.visible');
  
      // Κάνε κλικ στο PersonalDetails
      cy.contains('PersonalDetails').click();
  
      // Επαλήθευσε ότι περιέχει τα πεδία
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
  
      // Επαλήθευσε ότι το κουμπί Try it out υπάρχει
      cy.contains('Try it out').should('be.visible').click();
  
      // Επαλήθευσε ότι το κουμπί άλλαξε σε Cancel
      cy.contains('Cancel').should('be.visible');
    });
  
    /**
     * Checks if UserId input is visible and editable
     */
    it("Checks if UserId input is visible and editable", () => {
      cy.contains('PersonalDetails').click();
      cy.contains('Try it out').click();
  
      // Επαλήθευσε ότι το πεδίο UserId είναι ορατό
      cy.get('[placeholder="UserId - ID of the user"]').should('be.visible');
  
      // Εισάγει δεδομένα στο πεδίο UserId
      cy.get('[placeholder="UserId - ID of the user"]').type('12345').should('have.value', '12345');
    });
  
  
    /**
     * Checks if the Execute button is clickable
     */
    it("Checks if the Execute button is clickable", () => {
      cy.contains('PersonalDetails').click();
      cy.contains('Try it out').click();
  
      // Επαλήθευσε ότι το κουμπί Execute υπάρχει και είναι clickable
      cy.get(".btn.execute").should('be.visible').click();
  
      // Επαλήθευσε ότι εμφανίζονται αποτελέσματα
      cy.get(".responses-wrapper").should('be.visible');
    });
    

    it("Checks if response section is displayed after Execute", () => {
        cy.contains('PersonalDetails').click();
        cy.contains('Try it out').click();
      
        // Εισάγει δεδομένα στο πεδίο UserId
        cy.get('[placeholder="UserId - ID of the user"]').type('12345');
      
        // Πατάει το κουμπί Execute
        cy.get(".btn.execute").click();
      
        // Ελέγχει ότι η ενότητα Response εμφανίζεται
        cy.get(".responses-wrapper").should('be.visible');
      
        // Ελέγχει αν η ενότητα περιέχει status code (200 ή άλλο)
        cy.get(".responses-wrapper").contains("200").should('be.visible');
      });
      
      
  });
  
      
      
      
  

  


  








/*describe('Server Tests', () => {

    
        beforeEach(() => {
          // Επισκέπτεται το Swagger UI και ανοίγει το PersonalDetails
          cy.visit('/docs');
          cy.contains('PersonalDetails').click();
        });
      
        
          
        it('Checks if the response contains the field "Goal"', () => {
            // Πατάει "Try it out"
            cy.contains('Try it out').click();
        
            // Πατάει "Execute"
            cy.contains('Execute').click();
        
            // Ελέγχει αν το "Goal" είναι ορατό στην απόκριση
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "Goal");
          });
        
          it('Checks if the response contains the field "Surname"', () => {
            cy.contains('Try it out').click();
            cy.contains('Execute').click();
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "Surname");
          });
        
          it('Checks if the response contains the field "Age"', () => {
            cy.contains('Try it out').click();
            cy.contains('Execute').click();
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "Age");
          });
        
          it('Checks if the response contains the field "email"', () => {
            cy.contains('Try it out').click();
            cy.contains('Execute').click();
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "email");
          });
        
          it('Checks if the response contains the field "Weight"', () => {
            cy.contains('Try it out').click();
            cy.contains('Execute').click();
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "Weight");
          });
        
          it('Checks if the response contains the field "Name"', () => {
            cy.contains('Try it out').click();
            cy.contains('Execute').click();
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "Name");
          });
        
          it('Checks if the response contains the field "MobileNumber"', () => {
            cy.contains('Try it out').click();
            cy.contains('Execute').click();
            cy.get('pre.highlight-code', { timeout: 10000 }).should('contain.text', "MobileNumber");
          });
    
          
      
      
            



   it('Checks if the ContractInformation endpoint exists', () => {
      cy.visit('/docs'); // Επισκέπτεται το Swagger UI
      // Ελέγχει ότι είναι ορατά
      cy.contains('ContractInformation').should('be.visible');
      cy.contains('PersonalDetails').should('be.visible');
    });
  });




  describe('PersonalDetails API Tests', () => {
    it('Clicks on PersonalDetails and checks for the field "name"', () => {
      // Επισκέψου το Swagger UI
      cy.visit('/docs');
  
      // Κάνε κλικ στο PersonalDetails
      cy.contains('PersonalDetails').click();
  
      // Επαλήθευσε ότι περιέχει το πεδίο "name"
      cy.contains('name').should('be.visible');
    });

    it('Submits test data through Try it out and checks response', () => {
        cy.visit('/docs');
      
        // Κάνε κλικ στο PersonalDetails
        cy.contains('PersonalDetails').click();
      
        // Πάτησε "Try it out"
        cy.contains('Try it out').click();
      
        // Εισάγουμε δεδομένα στα input πεδία
        cy.get('input').eq(0).type('Lose Weight'); // Goal
        cy.get('input').eq(1).type('Doe'); // Surname
        cy.get('input').eq(2).type('30'); // Age
        cy.get('input').eq(3).type('john.doe@example.com'); // Email
        cy.get('input').eq(4).type('70'); // Weight
        cy.get('input').eq(5).type('John'); // Name
        cy.get('input').eq(6).type('1234567890'); // MobileNumber
      
        // Υποβάλλουμε το αίτημα
        cy.contains('Execute').click();
      
        // Επαλήθευσε ότι λαμβάνουμε response (π.χ., status 200)
        cy.contains('Server response').should('be.visible');
        cy.contains('200').should('be.visible'); // Status code 200
      });
      
      
      

  });
  */