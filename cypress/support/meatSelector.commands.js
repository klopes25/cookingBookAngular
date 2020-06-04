Cypress.Commands.add('checkMeatValue', (meat) => {
  Cy.get('.meats img')
    .eq(0)
    .invoke('attr', 'src')
    .should('include', meat);
});

Cypress.Commands.add('clickMeatItem', (index) => {
  Cy.get('.meats img')
    .eq(index)
    .click()
});

Cypress.Commands.add('isMeatDisable', (index) => {
  Cy.get('.meats img')
    .eq(index)
    .should("exist")
    .should('have.class', "disable");
});

