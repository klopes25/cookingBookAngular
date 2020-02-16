describe('Pagination', function() {

  beforeEach(function () {
    // open the web site
    cy.visit('/');
    // Just check that the good component are displayed at the initialization phase
    cy.get('recipes').should('exist');
    cy.get('pagination').should('exist');
    cy.get('recipe-item').should('exist');
    cy.get('recipe-item').its(length).should('be', 8);
  })

  it('pagination next and previous', function() {
    // check current page is 1
    cy.checkCurrentPage(1);
    // check the first item
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    // click on previous and check current page is always 1
    cy.previousPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    // click on first button and check current page is always 1
    cy.firstPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    // click on next button and check current page is now 2
    cy.nextPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(2);
    // check the first item
    cy.checkTitleItemOfTheCurrentPage('Samoussas au boeuf', 0);
    // click on previous and check current page is 1
    cy.previousPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    // click on last button and check current page is now equal to the max page
    cy.lastPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(123);
    // check the first item
    cy.checkTitleItemOfTheCurrentPage('Tarte chocolat au lait caramel beurre salé', 0);
    // click on next button and check current page is now 123
    cy.nextPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(123);
    cy.checkTitleItemOfTheCurrentPage('Tarte chocolat au lait caramel beurre salé', 0);
    // click on previous and check current page is max page - 1
    cy.previousPageButtonClick();
    cy.wait(500);
    cy.checkCurrentPage(122);
    // check the first item
    cy.checkTitleItemOfTheCurrentPage('Ramen sautées aux crevettes', 0);
  });

  it('pagination goTo', function() {
    // check current page is 1
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    // go to a negative page
    cy.goTo("-1");
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    // go to a page superior as max page
    cy.goTo("5000");
    cy.checkCurrentPage(123);
    cy.checkTitleItemOfTheCurrentPage('Tarte chocolat au lait caramel beurre salé', 0);
    // go to a page between 1 and max page
    cy.goTo("7");
    cy.checkCurrentPage(7);
    cy.checkTitleItemOfTheCurrentPage('Moelleux courgette-apéricube', 0);
  });

})