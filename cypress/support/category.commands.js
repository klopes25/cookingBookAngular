Cypress.Commands.add('clickOnNextCategory', () => {
  cy.get('category i')
    .eq(1)
    .should("exist")
    .click()
});

Cypress.Commands.add('clickOnPreviousCategory', () => {
  cy.get('category i')
    .eq(0)
    .should("exist")
    .click()
});

Cypress.Commands.add('isCategorySelected', (category) => {
  cy.get('category span div')
    .should("exist")
    .should('have.text', category);
});