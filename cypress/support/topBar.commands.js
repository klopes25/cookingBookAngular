Cypress.Commands.add('topBarFilterClick', (filterIndex) => {
  cy.get('top-bar .topBar .topBarItems span')
    .eq(filterIndex)
    .should("exist")
    .click()
});