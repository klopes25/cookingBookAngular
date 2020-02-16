describe('Application default', function() {

  beforeEach(function () {
    // open the web site
    cy.visit('/');
  })

  it('App initialization', function() {
    // Just check that the good component are displayed at the initialization phase
    cy.get('connect-zone').should('exist');
    cy.get('menu-global').should('exist');
    cy.get('filters').should('exist');
    cy.get('.content top-bar').should('exist');
    cy.get('.recipesZone').should('exist');
    cy.get('recipes').should('exist');
    cy.get('pagination').should('exist');
    cy.get('.recipe').should('not.exist');
    cy.get('.foot').should('exist');
  })

  it('App recipes loading', function() {
    // check that the recipes are automatically loaded
    cy.get('.recipesZone spinner').should('exist');
    cy.get('recipes').should('exist');
    cy.get('pagination').should('exist');
    cy.get('recipe-item').should('exist');
    cy.get('recipe-item').its(length).should('be', 8);
  })
})