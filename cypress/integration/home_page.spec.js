const { idleTimeoutMillis } = require("pg/lib/defaults");

describe("Main page", () => {
  beforeEach(() => {
    cy.visit("../../public/index.html");
  });
  it("It contains", () => {
    cy.contains("KAZAPP");
  });
  it("It contains", () => {
    cy.contains("Your Top rated restaurants");
  });
  it("It contains", () => {
    cy.contains("Your most recent restaurants");
  });
  it("It contains", () => {
    cy.contains("Your most recent restaurants");
  });
});

describe("Testing Add a new restaurant section", () => {
  it(".type() - type into a DOM element", () => {
    cy.get("#inputdate").type("2021-12-12").should("have.value", "2021-12-12");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("#inputname").type("Lala").should("have.value", "Lala");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("#inputlocation").type("Lagos").should("have.value", "Lagos");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("#inputmenu").type("Eba").should("have.value", "Eba");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("#inputrating").type("6").should("have.value", "6");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("#inputspent").type("45").should("have.value", "45");
  });
  it(".type() - type into a DOM element", () => {
    cy.get(".submit-button").click();
  });
});

describe("Testing your spending pattern section", () => {
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("January 2021").should("have.value", "january");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("February 2021").should("have.value", "February");
  });
  it("should contain amount spent in january", () => {
    cy.contains("Total amount spent in january");
    cy.contains("You spent")
  });

  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("March").should("have.value", "March");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("April").should("have.value", "April");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("May").should("have.value", "May");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("June").should("have.value", "June");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("July").should("have.value", "July");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("August").should("have.value", "August");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("September").should("have.value", "September");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("October").should("have.value", "October");
  });
  it(".select() - select an option in a <select> element", () => {
    cy.get("#months").select("November").should("have.value", "November");
  });
});
