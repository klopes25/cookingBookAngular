Cypress.Commands.add('checkMenuButtonText', (index, text) => {
  // notification exist ?
  cy.get('menu-global .menuLateralItems .menuLateralItem')
    .eq(index)
    .should('have.text', text);
});

Cypress.Commands.add('clickOnMenuButton', (index) => {
  cy.get('menu-global .menuLateralItems .menuLateralItem')
    .eq(index)
    .click();
});

Cypress.Commands.add('countMenuButton', (size) => {
  cy.get('menu-global .menuLateralItems .menuLateralItem')
    .should('have.length', size)
});
