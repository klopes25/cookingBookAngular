Cypress.Commands.add('checkChiefTipContent', (text) => {
  cy.get('.chiefTip .chiefTipContent div')
    .should("exist")
    .should('have.text', text);
});

Cypress.Commands.add('editChiefTipContent', (text) => {
  cy.get('.chiefTip .chiefTipContent input')
    .type(`${text}{enter}`);
});

Cypress.Commands.add('isChiefTipEdited', () => {
  cy.get('.chiefTip .chiefTipContent')
    .should("exist")
    .should('have.class', "isEdited");
});

Cypress.Commands.add('isChiefTipHighlighted', (text) => {
  cy.get('.chiefTip .chiefTipContent div mark')
    .should("exist")
    .should('have.text', text);
});