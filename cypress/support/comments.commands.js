Cypress.Commands.add('addComment', (text) => {
  cy.get('.comments textarea ')
    .type(`${text}{enter}`);

  cy.get('.comments .textPart button')
    .should('exist')
    .click();
});

Cypress.Commands.add('countComments', (counter) => {
  cy.get('.comments .commentList comment')
    .its(length).should('be', counter);
});

Cypress.Commands.add('deleteComment', (index) => {
  cy.get('.comments .commentList comment')
    .eq(index)
    .get('.author i')
    .eq(1)
    .click()
});

Cypress.Commands.add('editComment', (index, text) => {
  cy.get('.comments .commentList comment')
    .eq(index)
    .get('.author i')
    .eq(0)
    .click()

  cy.get('.comments .commentList comment .commentEdition')
    .type(text)
    .blur()
});

Cypress.Commands.add('isAuthorComment', (index, author) => {
  cy.get('.comments .commentList comment')
    .eq(index)
    .get('.author span')
    .should('have.text', author);
});

Cypress.Commands.add('isDateComment', (index, date) => {
  cy.get('.comments .commentList comment')
    .eq(index)
    .get('.author span')
    .should('have.text', date);
});