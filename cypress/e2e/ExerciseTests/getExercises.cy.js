
describe(" GET /exercise", () => {
    /**
     * Ανοίγω το SwaggerHub UI
     */
    beforeEach(() => {
      cy.visit("/docs/");
    });
  
//Ελέγχω αν υπάρχουν οι ασκήσεις και κάνω click, 
//στη συνέχεια βλέπω οτι επιστρέφονται όλες οι ασκήσεις
    it("Checks if the GET /exercise endpoint exists", () => {
      
      cy.get("#operations-default-getAllExercises").should("be.visible");
  
      cy.get("#operations-default-getAllExercises").click();
  
      cy.contains("Returns all exercises").should("be.visible");
    });
  
//Ελέγχω αν υπάρχουν οι ασκήσεις και κάνω click, 
//στη συνέχεια βλέπω ότι υπάρχει το κουμπί Try it out και στο τέλος αλλάζει σε Cancel
    it("Checks if 'Try it out' button is clickable", () => {
      cy.get("#operations-default-getAllExercises").click();

      cy.contains("Try it out").should("be.visible").click();

      cy.contains("Cancel").should("be.visible");
    });
  
//Ελέγχω αν υπάρχουν οι ασκήσεις και κάνω click, 
//στη συνέχεια βλέπω ότι υπάρχει το κουμπί Try it out και στο τέλος επαλυθεύω οτι τα πεδία 'searchText' και 'filter' είναι ορατά
    it("Checks if the parameters are visible and editable", () => {
      cy.get("#operations-default-getAllExercises").click();
      cy.contains("Try it out").click();
  
      cy.get('[placeholder="searchText"]').should("be.visible").type("example").should("have.value", "example");
    });
  
//Ελέγχω αν υπάρχουν οι ασκήσεις και κάνω click, 
//στη συνέχεια βλέπω ότι υπάρχει το κουμπί Try it out, 
//εισάγω στο searchText και πατάω το Execute, στο τέλος ελέγχω ότι εμφανίζονται τα αποτελέσματα
    it("Checks if the Execute button is clickable", () => {
      cy.get("#operations-default-getAllExercises").click();
      cy.contains("Try it out").click();
  
      cy.get('[placeholder="searchText"]').type("example");
  
      cy.get(".btn.execute").should("be.visible").click();

      cy.get(".responses-wrapper").should("be.visible");
    });
  
//Ελέγχω αν υπάρχουν οι ασκήσεις και κάνω click, 
//στη συνέχεια βλέπω ότι υπάρχει το κουμπί Try it out, 
//εισάγω στο searchText και πατάω το Execute, 
//στο τέλος ελέγχω ότι η απάντηση περιέχει τα πεδία explanationVideo, exerciseImage και Title
    it("Checks if the response contains expected keys", () => {
      cy.get("#operations-default-getAllExercises").click();
      cy.contains("Try it out").click();
  
      cy.get('[placeholder="searchText"]').type("example");
  
      cy.get(".btn.execute").click();
  
      cy.get(".responses-wrapper pre").should("contain.text", "explanationVideo");
      cy.get(".responses-wrapper pre").should("contain.text", "exerciseImage");
      cy.get(".responses-wrapper pre").should("contain.text", "Title");
    });
  });
  
