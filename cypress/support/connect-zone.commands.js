Cypress.Commands.add('clearLoginPassword', () => {
  // connection zone exist ?
  cy.get('connect-zone .unconnected').should('exist');
  // clear inputs
  cy.get('connect-zone .unconnected .login input')
    .clear();
  cy.get('connect-zone .unconnected .password input')
    .clear()
});

Cypress.Commands.add('isLogged', (login, avatar) => {
  // logged zone exist ?
  cy.get('connect-zone .connected').should('exist');
  // check the login
  cy.get('connect-zone .connected .userDetails > span')
    .should('exist')
    .should('have.text', login);
  // check the avatar
  cy.get('connect-zone .connected > img')
    .invoke('attr', 'src')
    .should('include', avatar);
});

Cypress.Commands.add('openCreateAccount', () => {
  cy.get('connect-zone .unconnected').should('exist');
  cy.get('connect-zone .unconnected .notMember .link')
    .click();
});

Cypress.Commands.add('signIn', (login, password) => {
  // connection zone exist ?
  cy.get('connect-zone .unconnected').should('exist');
  // enter login and password
  cy.get('connect-zone .unconnected .login input')
    .type(`${login}{enter}`);
  cy.get('connect-zone .unconnected .password input')
  .should('be.focus')
  .type(`${password}{enter}`);
});