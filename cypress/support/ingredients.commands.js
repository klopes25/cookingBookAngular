Cypress.Commands.add('addIngredient', (group, text, quantity, unit) => {
  Cy.get('.addIngredient .groupInput')
    .type(`${group}{enter}`);

  Cy.get('.addIngredient .ingredientInput')
    .type(`${text}{enter}`);

  Cy.get('.addIngredient .quantityInput')
    .type(`${quantity}{enter}`);

  Cy.get('.addIngredient .unitInput')
    .type(`${unit}{enter}`);

  Cy.get('ingredients .validation span')
    .click()
});

Cypress.Commands.add('checkIngredient', (index, text, quantity, unit) => {
  Cy.get('ingredients .ingredientList .ingredientDisplay')
    .eq(index)
    .get('span')
    .eq(1)
    .should('have.text', `${text} ${quantity} ${unit}`);
});

Cypress.Commands.add('countIngredients', (counter) => {
  Cy.get('ingredients .ingredientList li')
    .its(length).should('be', counter);
});

Cypress.Commands.add('deleteIngredient', (index) => {
  Cy.get('ingredients .ingredientList li .icon-trash')
    .eq(index)
    .click();

  Cy.get('ingredients .validation span')
    .click()
});

Cypress.Commands.add('downIngredient', (index) => {
  Cy.get('ingredients .ingredientList li .upDown .icon-down-open')
    .eq(index)
    .click();

  Cy.get('ingredients .validation span')
    .click()
});

Cypress.Commands.add('editIngredient', (index, group, text, quantity, unit) => {
  Cy.get('ingredients .ingredientList li')
    .eq(index)
    .get('ingredientInput')
    .eq(0)
    .type(`${group}{enter}`);

  Cy.get('ingredients .ingredientList li')
    .eq(index)
    .get('ingredientInput')
    .eq(1)
    .type(`${text}{enter}`);

  Cy.get('ingredients .ingredientList li')
    .eq(index)
    .get('ingredientInput')
    .eq(2)
    .type(`${quantity}{enter}`);

  Cy.get('ingredients .ingredientList li')
    .eq(index)
    .get('ingredientInput')
    .eq(3)
    .type(`${unit}{enter}`);

  Cy.get('ingredients .validation span')
    .click()
});

Cypress.Commands.add('isIngredientHighlighted', (index) => {
  Cy.get('ingredients .ingredientList .ingredientDisplay')
    .eq(index)
    .get('mark')
    .should('exist');
});

Cypress.Commands.add('isIngredientsEdited', () => {
  Cy.get('.addIngredient')
    .should('exist')
});

Cypress.Commands.add('isIngredientsLegendOpen', () => {
  Cy.get('.ingredientsLegend.open')
    .should("exist")
    .should('not.have.class', "disable");
});

Cypress.Commands.add('openIngredientsLegend', () => {
  Cy.get('ingredients .ingredientIcon')
    .click();
});

Cypress.Commands.add('upIngredient', (index) => {
  Cy.get('ingredients .ingredientList li .upDown .icon-up-open')
    .eq(index)
    .click();

  Cy.get('ingredients .validation span')
    .click()
});
