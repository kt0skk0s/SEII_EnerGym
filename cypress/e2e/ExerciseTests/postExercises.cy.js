describe("EnerGym API: POST /admin/{AdminID}/exercises", () => {
    beforeEach(() => {
    /**
     * Ανοίγω το SwaggerHub UI
     */
      cy.visit("/docs/");
      cy.wait(2000); // Περιμένω να φορτώσει η σελίδα
    });

//Ελέγχω αν υπάρχει το κουμπί "add a new exercise" και κάνω click, 
//στη συνέχεια βλέπω ότι υπάρχει η παράμετρος AdminID και το κουμπί "Try it out" και το πατάω.
//Εντοπίζω και πατάω το Execute, στο τέλος ελέγχω ότι η απόκριση περιέχει status code 201

    it("Checks if the POST /admin/{AdminID}/exercises endpoint exists and can be clicked", () => {

      cy.contains("Add new exercise").should("exist").should("be.visible").click();
  
      cy.contains('Add new exercise').should('be.visible'); // Περιγραφή endpoint
      cy.contains('AdminID').should('be.visible'); // Έλεγχος παραμέτρου
      
      cy.contains("Try it out").should("exist").click();
  
      cy.contains("Execute").should("exist").click();
  
      cy.contains("Response").should("exist");
      cy.contains("201").should("be.visible");
  
  
    });
  
//Ελέγχω αν υπάρχει το κουμπί "add a new exercise" και κάνω click, 
//στη συνέχεια βλέπω το κουμπί "Try it out" και το πατάω.
//Προσθέτω στο textarea τα στοιχεία της νέας άσκησης και πατάω Execute ,
//στο τέλος ελέγχω ότι η απόκριση περιέχει status code 201
    it("Checks success response when all fields are valid", () => {
      
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
    
      cy.contains("Execute").click();
    
      // Ελέγχει ότι η απόκριση περιέχει status code 201
      cy.contains("Response").should("exist");
      cy.contains("201").should("be.visible");
      cy.contains("Exercise added successfully").should("exist");
    });
    
  });