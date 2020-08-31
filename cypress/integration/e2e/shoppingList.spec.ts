describe('Shopping list', function() {

  beforeEach(function () {
    // open the web site
    cy.visit('/');
    // connect
    cy.signIn('testlogin', "testpassword");
    cy.isLogged('testlogin', 'citrouille');
    // check we are page 1
    cy.checkCurrentPage(1);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
  })

  it('add items to cart', function() {
    // open the third recipe
    cy.clickOnRecipeItem(2);
    // add ingredients to cart
    
    // open the fifth recipe

    // double recipe ingredient and add it to cart

    // check cart

  });

})