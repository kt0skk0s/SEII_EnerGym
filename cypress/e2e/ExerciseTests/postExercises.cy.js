describe("EnerGym API: POST /admin/{AdminID}/exercises", () => {
    beforeEach(() => {
      cy.visit("/docs/");
      cy.wait(2000); // Περιμένω να φορτώσει η σελίδα
    });
  
    it("Checks if the POST /admin/{AdminID}/exercises endpoint exists and can be clicked", () => {
      
      cy.contains("Add new exercise").should("exist").should("be.visible").click();  // Ελέγχει αν υπάρχει το κουμπί "exercise" και το ανοίγει

  
      // Επαληθεύει ότι το endpoint άνοιξε σωστά
      cy.contains('Add new exercise').should('be.visible'); 
      cy.contains('AdminID').should('be.visible'); // Έλεγχος παραμέτρου
      
      cy.contains("Try it out").should("exist").click();
  
      cy.contains("Execute").should("exist").click();   // Εντοπίζει και πατάει το κουμπί Execute

  
     // Ελέγχει ότι η απόκριση περιέχει status code 201
      cy.contains("Response").should("exist");
      cy.contains("201").should("be.visible");
  
  
    });
  
  
    it("Checks success response when all fields are valid", () => {
      
      cy.contains("Add new exercise").should("exist").should("be.visible").click();   // Ελέγχει αν υπάρχει το κουμπί "exercise" και το ανοίγει

      
      cy.contains("Try it out").click(); // κλικ στο Try it out

  
      cy.get("textarea").clear().type(`
        {
        "explanationVideo": {},
        "exerciseImage": "valid_image.jpg",
        "Title": "Valid Exercise"
        }`
      );
    
      // Πατάει Execute
      cy.contains("Execute").click();
    
      // Ελέγχει ότι η απόκριση περιέχει status code 201
      cy.contains("Response").should("exist");
      cy.contains("201").should("be.visible");
      cy.contains("Exercise added successfully").should("exist");
    });
    
  });