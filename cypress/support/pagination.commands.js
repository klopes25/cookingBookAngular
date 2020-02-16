Cypress.Commands.add('checkCurrentPage', (currentPage) => {
  // current page exist ?
  cy.get('pagination #pagination .pagination .currentPage')
    .should('exist')
    .should('have.text', ` ${currentPage} `);
})

Cypress.Commands.add('firstPageButtonClick', () => {
  // current page exist ?
  cy.get('pagination #pagination .icon-to-start')
    .should('exist')
    .click();
})

Cypress.Commands.add('goTo', (page) => {
  cy.get('pagination #pagination .currentPage')
    .should('exist')
    .click();
  cy.get('pagination #pagination .pagination input')
    .should('exist')
    .type(`${page}{enter}`)
});

Cypress.Commands.add('lastPageButtonClick', () => {
  // current page exist ?
  cy.get('pagination #pagination .icon-to-end')
    .should('exist')
    .click();
})

Cypress.Commands.add('nextPageButtonClick', () => {
  // current page exist ?
  cy.get('pagination #pagination .icon-right-open')
    .should('exist')
    .click();
})

Cypress.Commands.add('previousPageButtonClick', () => {
  // current page exist ?
  cy.get('pagination #pagination .icon-left-open')
    .should('exist')
    .click();
})