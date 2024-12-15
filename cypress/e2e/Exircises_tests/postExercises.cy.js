describe("EnerGym API: POST /admin/{AdminID}/exercises", () => {
  beforeEach(() => {
    cy.visit("/docs/");
    cy.wait(2000); // Περιμένω να φορτώσει η σελίδα
  });

  it("Checks if the POST /admin/{AdminID}/exercises endpoint exists and can be clicked", () => {
        // Ελέγχει αν υπάρχει το κουμπί "exercise" και το ανοίγει
        cy.contains("Add new exercise").should("exist").should("be.visible").click();

    // Επαληθεύει ότι το endpoint άνοιξε σωστά
    cy.contains('Add new exercise').should('be.visible'); // Περιγραφή endpoint
    cy.contains('AdminID').should('be.visible'); // Έλεγχος παραμέτρου
    
    cy.contains("Try it out").should("exist").click();

    // Εντοπίζει και πατάει το κουμπί Execute
    cy.contains("Execute").should("exist").click();

   // Ελέγχει ότι η απόκριση περιέχει status code 201
    cy.contains("Response").should("exist");
    cy.contains("201").should("be.visible");


  });


  it("Checks success response when all fields are valid", () => {
    
    // Ελέγχει αν υπάρχει το κουμπί "exercise" και το ανοίγει
    cy.contains("Add new exercise").should("exist").should("be.visible").click();
    
    // Πατάει Try it out
    cy.contains("Try it out").click();

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