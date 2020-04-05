Cypress.Commands.add('countNotif', (nb) => {
  cy.get('notification').find('li').should('have.length', nb);
});

Cypress.Commands.add('haveNotifWithType', (message, type) => {
  // notification exist ?
  cy.get('notification').should('exist');
  // check class notification exist and contains message
  cy.get(`notification .${type}`)
    .should('exist')
    .should('have.text', message);
});