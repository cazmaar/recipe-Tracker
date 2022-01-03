const { idleTimeoutMillis } = require("pg/lib/defaults");

describe("Main page", () => {
  it("succesfully loads", () => {
   cy.visit("http://google.com")
  });
});
