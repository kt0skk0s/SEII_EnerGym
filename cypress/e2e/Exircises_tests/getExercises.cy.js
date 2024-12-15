describe(" GET /exercise", () => {
    /**
     * Opens SwaggerHub UI
     */
    beforeEach(() => {
      cy.visit("/docs/");
    });
  
    /**
     * Checks if the GET /exercise endpoint exists
     */
    it("Checks if the GET /exercise endpoint exists", () => {
      // Εντοπίζει το GET /exercise endpoint
      cy.get("#operations-default-getAllExercises").should("be.visible");
  
      // Κάνε κλικ στο GET /exercise
      cy.get("#operations-default-getAllExercises").click();
  
      // Επαλήθευσε ότι εμφανίζεται η περιγραφή του endpoint
      cy.contains("Returns all exercises").should("be.visible");
    });
  
    /**
     * Checks if 'Try it out' button is clickable
     */
    it("Checks if 'Try it out' button is clickable", () => {
      cy.get("#operations-default-getAllExercises").click();
  
      // Επαλήθευσε ότι υπάρχει το κουμπί Try it out
      cy.contains("Try it out").should("be.visible").click();
  
      // Επαλήθευσε ότι το κουμπί αλλάζει σε Cancel
      cy.contains("Cancel").should("be.visible");
    });
  
    /**
     * Checks if the parameters are visible and editable
     */
    it("Checks if the parameters are visible and editable", () => {
      cy.get("#operations-default-getAllExercises").click();
      cy.contains("Try it out").click();
  
      // Επαλήθευσε ότι τα πεδία 'searchText' και 'filter' είναι ορατά
      cy.get('[placeholder="searchText"]').should("be.visible").type("example").should("have.value", "example");
    });
  
    /**
     * Checks if the Execute button is clickable
     */
    it("Checks if the Execute button is clickable", () => {
      cy.get("#operations-default-getAllExercises").click();
      cy.contains("Try it out").click();
  
      // Εισάγει δεδομένα στο πεδίο 'searchText'
      cy.get('[placeholder="searchText"]').type("example");
  
      // Πατάει το κουμπί Execute
      cy.get(".btn.execute").should("be.visible").click();
  
      // Επαλήθευσε ότι εμφανίζονται τα αποτελέσματα
      cy.get(".responses-wrapper").should("be.visible");
    });
  
    /**
     * Checks if the response contains expected keys
     */
    it("Checks if the response contains expected keys", () => {
      cy.get("#operations-default-getAllExercises").click();
      cy.contains("Try it out").click();
  
      // Εισάγει δεδομένα στο πεδίο 'searchText'
      cy.get('[placeholder="searchText"]').type("example");
  
      // Πατάει το κουμπί Execute
      cy.get(".btn.execute").click();
  
      // Επαλήθευσε ότι η απάντηση περιέχει τα πεδία explanationVideo, exerciseImage και Title
      cy.get(".responses-wrapper pre").should("contain.text", "explanationVideo");
      cy.get(".responses-wrapper pre").should("contain.text", "exerciseImage");
      cy.get(".responses-wrapper pre").should("contain.text", "Title");
    });
  });
  