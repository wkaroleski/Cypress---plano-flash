/// <reference types="cypress" />

describe("Compra plano flash", () => {
  beforeEach(() => {
    cy.visit("https://fm-site-br/login");
    cy.get(
      '[data-v-350b7d04=""][data-v-62b69f4a=""] > .mdc-text-field > .mdc-text-field__input'
    ).type("53999200001");
    cy.get(
      'div[data-v-5eae9f56=""][data-v-62b69f4a=""] > .mdc-text-field > .mdc-text-field__input'
    ).type("123456");
    cy.get(".login__btn").click();
    // cy.visit("https://fm-site-br/profile/415278/plans");
    Cypress.Commands.add("solveGoogleReCAPTCHA", () => {
      // Wait until the iframe (Google reCAPTCHA) is totally loaded
      cy.wait(500);
      cy.get("#g-recaptcha *> iframe").then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body)
          .find(".recaptcha-checkbox-border")
          .should("be.visible")
          .click();
      });
    });
  });

  it("Devem realizar compra do plano Flash", () => {
    cy.get(":nth-child(2) > .plans-list > .button-area").click();
    cy.get(":nth-child(1) > .card-plan > .card-plan__buy > a > span").click();
    cy.get(":nth-child(3) > .radio-button").click();
    cy.get(
      ".js-input-card-number > .mdc-text-field > .mdc-text-field__input"
    ).type("5479 4089 1416 7487");
    cy.get(
      ".js-input-card-name > .mdc-text-field > .mdc-text-field__input"
    ).type("Wagner Karoleski");
    cy.get(":nth-child(1) > .mdc-select__native-control").select("05");
    cy.get(":nth-child(2) > .mdc-select__native-control").select("2024");
    cy.get(
      ".js-input-card-ccv > .mdc-text-field > .mdc-text-field__input"
    ).type("123");
    cy.get(".payment-methods__buy > .inner--text").click();
    cy.wait(1000);
    cy.get(".payment-methods__buy > .inner--text").click();

    cy.get(".purchase-note__header > .title").should(
      "have.text",
      "COMPRA EFETUADA!"
    );
  });
});
