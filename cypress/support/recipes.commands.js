Cypress.Commands.add('checkTitleItemOfTheCurrentPage', (recipeTitle, index) => {
  cy.get('recipes .recipes recipe-item .thumbnail .nomPhoto')
    .eq(index)
    .should('have.text', recipeTitle);
});

Cypress.Commands.add('checkNoRecipesDisplayed', () => {
  cy.get('recipes .recipes recipe-item')
    .should('not.exist');
})

Cypress.Commands.add('clickOnRecipeItem', (index) => {
  cy.get('recipes .recipes recipe-item')
    .eq(index)
    .click()
})


Cypress.Commands.add('countRecipesDisplayed', (counter) => {
  cy.get('recipes .recipes recipe-item')
  .its(length).should('be', counter);
})
