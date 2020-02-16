// VALIDATED
Cypress.Commands.add('clickOnOnlyValidatedRecipesButton', () => {
  cy.get('filters .filters .filtersContainer .icon-ok-squared')
    .should("exist")
    .click();
});

Cypress.Commands.add('checkOnlyValidatedRecipesButtonState', (bool) => {
  cy.get('filters .filters .filtersContainer .icon-ok-squared')
    .should(`${bool ? '' : 'not.'}have.class`, "activated");
});


// NEW
Cypress.Commands.add('clickOnOnlyNewRecipesButton', () => {
  cy.get('filters .filters .filtersContainer .icon-gift')
    .should("exist")
    .click();
});

Cypress.Commands.add('checkOnlyNewRecipesButtonState', (bool) => {
  cy.get('filters .filters .filtersContainer .icon-gift')
    .should(`${bool ? '' : 'not.'}have.class`, "activated")
});


// DELETED
Cypress.Commands.add('clickOnOnlyDeletedRecipesButton', () => {
  cy.get('filters .filters .filtersContainer .icon-heart-broken')
    .should("exist")
    .click();
});

Cypress.Commands.add('checkOnlyDeletedRecipesButtonState', (bool) => {
  cy.get('filters .filters .filtersContainer .icon-heart-broken')
    .should(`${bool ? '' : 'not.'}have.class`, "activated")
});


// HOT
Cypress.Commands.add('clickOnHotFilterButton', () => {
  cy.get('filters .filters .filtersContainer .icon-extinguisher')
    .should("exist")
    .click();
});

Cypress.Commands.add('checkHotButtonState', (bool) => {
  cy.get('filters .filters .filtersContainer .icon-extinguisher')
    .should(`${bool ? '' : 'not.'}have.class`, "activated")
});

Cypress.Commands.add('changeMinusHot', (min) => {
  cy.get("filters .filters .filtersContainer .icon-extinguisher")
    .trigger('mouseover');
  cy.get('filters .filters .filtersContainer .icon-extinguisher .overPart input')
    .eq(0)
    .clear()
    .type(`${min}{enter}`)
  cy.get('filters .filters .filtersContainer .icon-extinguisher .overPart button')
    .click();
})

Cypress.Commands.add('changeMaxHot', (min) => {
  cy.get("filters .filters .filtersContainer .icon-extinguisher")
    .trigger('mouseover');
  cy.get('filters .filters .filtersContainer .icon-extinguisher .overPart input')
    .eq(1)
    .clear()
    .type(`${min}{enter}`)
  cy.get('filters .filters .filtersContainer .icon-extinguisher .overPart button')
    .click();
})


// RANK
Cypress.Commands.add('clickOnRankFilterButton', () => {
  cy.get('filters .filters .filtersContainer .icon-star')
    .should("exist")
    .click();
});

Cypress.Commands.add('checkRankButtonState', (bool) => {
  cy.get('filters .filters .filtersContainer .icon-star')
    .should(`${bool ? '' : 'not.'}have.class`, "activated")
});

Cypress.Commands.add('changeMinusRank', (min) => {
  cy.get("filters .filters .filtersContainer .icon-star")
    .trigger('mouseover');
  cy.get('filters .filters .filtersContainer .icon-star .overPart input')
    .eq(0)
    .clear()
    .type(`${min}{enter}`)
  cy.get('filters .filters .filtersContainer .icon-star .overPart button')
    .click();
})

Cypress.Commands.add('changeMaxRank', (min) => {
  cy.get("filters .filters .filtersContainer .icon-star")
    .trigger('mouseover');
  cy.get('filters .filters .filtersContainer .icon-star .overPart input')
    .eq(1)
    .clear()
    .type(`${min}{enter}`)
  cy.get('filters .filters .filtersContainer .icon-star .overPart button')
    .click();
})
