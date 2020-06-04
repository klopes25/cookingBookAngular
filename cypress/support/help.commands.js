Cypress.Commands.add('closeHelp', () => {
  cy.get('.helpContainer')
    .should("exist")
    .click()
});

Cypress.Commands.add('isHelpOpen', () => {
  cy.get('.helpContainer')
    .should("exist")
    .should('have.class', "show");
});
