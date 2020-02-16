Cypress.Commands.add('checkUserFormValues', (login, password, email, avatarIndex = 5) => {
   // connection zone exist ?
   cy.get('user-form .formContainer').should('exist');
   // enter login and password
   cy.get('user-form .formContainer .inputs input')
    .eq(0)
    .should('have.value', login);
   cy.get('user-form .formContainer .inputs input')
    .eq(1)
    .should('have.value', password);
   cy.get('user-form .formContainer .inputs input')
    .eq(2)
    .should('have.value', email);
   cy.get('user-form .formContainer .avatars img')
    .eq(avatarIndex)
    .should("have.class", "selected");
});

Cypress.Commands.add('clearUserFormValues', () => {
  // connection zone exist ?
  cy.get('user-form .formContainer').should('exist');
  // clear inputs
  cy.get('user-form .formContainer .inputs input')
    .eq(0)
    .clear();
  cy.get('user-form .formContainer .inputs input')
    .eq(1)
    .clear();
  cy.get('user-form .formContainer .inputs input')
    .eq(2)
    .clear();
  cy.get('user-form .formContainer .avatars img')
    .eq(5)
    .click()
});

Cypress.Commands.add('closeUserForm', () => {
  cy.get('user-form .formContainer .buttons .closeUser')
    .click();
});

Cypress.Commands.add('isAvatarSelected', (avatarIndex) => {
  cy.get('user-form .formContainer .avatars img')
    .eq(avatarIndex)
    .should("have.class", "selected");
});

Cypress.Commands.add('populateUserForm', (login, password, email, avatarIndex = 5) => {
  // connection zone exist ?
  cy.get('user-form .formContainer').should('exist');
  // enter login and password
  cy.get('user-form .formContainer .inputs input')
    .eq(0)
    .type(`${login}{enter}`);
  cy.get('user-form .formContainer .inputs input')
    .eq(1)
    .type(`${password}{enter}`);
  cy.get('user-form .formContainer .inputs input')
    .eq(2)
    .type(`${email}{enter}`);
  cy.get('user-form .formContainer .avatars img')
    .eq(avatarIndex)
    .click()
});

Cypress.Commands.add('validateUserForm', () => {
  cy.get('user-form .formContainer .buttons .validUser')
    .click();
});