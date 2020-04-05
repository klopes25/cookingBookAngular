describe('Filter recipes', function() {

  beforeEach(function () {
    // open the web site
    cy.visit('/');
    // Just check that the good component are displayed at the initialization phase
    cy.get('recipes').should('exist');
    cy.get('pagination').should('exist');
    cy.get('recipe-item').should('exist');
    cy.get('recipe-item').its(length).should('be', 8);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
  })

  it('filter categories', function() {
    // filter by apero
    cy.topBarFilterClick(0);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Chips de banane plantain', 8);
    cy.topBarFilterIsSelected(0);
    // filter by entree
    cy.topBarFilterClick(1);
    cy.checkTitleItemOfTheCurrentPage('Beignets de maïs', 0);
    cy.checkTitleItemOfTheCurrentPage('Nems au porc', 8);
    cy.topBarFilterIsSelected(1);
    // filter by plat
    cy.topBarFilterClick(2);
    cy.checkTitleItemOfTheCurrentPage('Riz cantonais', 0);
    cy.checkTitleItemOfTheCurrentPage('Rôti de porc moutarde et miel', 8);
    cy.topBarFilterIsSelected(2);
    // filter by dessert
    cy.topBarFilterClick(3);
    cy.checkTitleItemOfTheCurrentPage('Charlotte aux fraises', 0);
    cy.checkTitleItemOfTheCurrentPage('Perles coco', 8);
    cy.topBarFilterIsSelected(3);
    // filter by boisson
    cy.topBarFilterClick(4);
    cy.checkTitleItemOfTheCurrentPage('Sirop de fraise tagada', 0);
    cy.checkTitleItemOfTheCurrentPage('Milkshake menthe & chocolat', 8);
    cy.topBarFilterIsSelected(4);
    // filter by autres
    cy.topBarFilterClick(5);
    cy.checkTitleItemOfTheCurrentPage('Bagels', 0);
    cy.checkTitleItemOfTheCurrentPage('Muffins anglais', 8);
    cy.topBarFilterIsSelected(5);
    // filter by tous
    cy.topBarFilterClick(6);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    cy.topBarFilterIsSelected(6);
  });

  it('filter only validated', function() {
    // connect
    cy.signIn('testvalidated', "test");
    cy.isLogged('testvalidated', 'egg');
    // check we are page 1
    cy.checkCurrentPage(1);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    // go to page 4
    cy.goTo(4);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Milkshake mangue & ananas', 0);
    cy.checkTitleItemOfTheCurrentPage('Biscuit emmental', 8);
    // filter by validated
    cy.checkOnlyValidatedRecipesButtonState(false);
    cy.clickOnOnlyValidatedRecipesButton();
    cy.checkOnlyValidatedRecipesButtonState(true);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 8);
    // check we are page 1
    cy.checkCurrentPage(1);
    // remove filter
    cy.clickOnOnlyValidatedRecipesButton();
    cy.checkOnlyValidatedRecipesButtonState(false);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
  });

  it('filter only new recipes', function() {
    // connect
    cy.signIn('testvalidated', "test");
    cy.isLogged('testvalidated', 'egg');
    // go to last page
    cy.lastPageButtonClick();
    // check we are page 125
    cy.checkCurrentPage(125);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('boisson#2', 0);
    // filter by new
    cy.checkOnlyNewRecipesButtonState(false);
    cy.clickOnOnlyNewRecipesButton();
    cy.checkOnlyNewRecipesButtonState(true);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    // check we are page 1
    cy.checkCurrentPage(1);
    // go to last page
    cy.lastPageButtonClick();
    // check we are page 123
    cy.checkCurrentPage(123);
    // remove filter
    cy.clickOnOnlyNewRecipesButton();
    cy.checkOnlyNewRecipesButtonState(false);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
  });

  it('filter only deleted recipes', function() {
    // connect
    cy.signIn('testdeleted', "test");
    cy.isLogged('testdeleted', 'egg');
    // check we are page 1
    cy.checkCurrentPage(1);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    // go to page 4
    cy.goTo(4);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Milkshake mangue & ananas', 0);
    cy.checkTitleItemOfTheCurrentPage('Biscuit emmental', 8);
    // filter by validated
    cy.checkOnlyDeletedRecipesButtonState(false);
    cy.clickOnOnlyDeletedRecipesButton();
    cy.checkOnlyDeletedRecipesButtonState(true);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 8);
    // check we are page 1
    cy.checkCurrentPage(1);
    // remove filter
    cy.clickOnOnlyDeletedRecipesButton();
    cy.checkOnlyDeletedRecipesButtonState(false);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
  });

  it('filter hot', function() {
    // connect
    cy.signIn('testvalidated', "test");
    cy.isLogged('testvalidated', 'egg');
    // check we are page 1
    cy.checkCurrentPage(1);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    // test min 3 max 3
    cy.changeMinusHot(3);
    cy.checkHotButtonState(false);
    cy.clickOnHotFilterButton();
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
    // test min 2 max 3
    cy.changeMinusHot(2);
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Lok lak', 0);
    cy.checkTitleItemOfTheCurrentPage('Kara miso ramen', 8);
    // test min 2 max 2
    cy.changeMinusHot(2);
    cy.changeMaxHot(2);
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Lok lak', 0);
    cy.checkTitleItemOfTheCurrentPage('Kara miso ramen', 8);
    // test min 1 max 3
    cy.changeMinusHot(1);
    cy.changeMaxHot(3);
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Muffin chorizo-emmental', 0);
    cy.checkTitleItemOfTheCurrentPage('Madeleine au chorizo', 8);
    // test min 1 max 2
    cy.changeMinusHot(1);
    cy.changeMaxHot(2);
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Muffin chorizo-emmental', 0);
    cy.checkTitleItemOfTheCurrentPage('Madeleine au chorizo', 8);
    // test min 1 max 1
    cy.changeMinusHot(1);
    cy.changeMaxHot(1);
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Muffin chorizo-emmental', 0);
    cy.checkTitleItemOfTheCurrentPage('Jambon rôti caramélisé', 8);
    // test min 2 max 1 => 2 2
    cy.changeMinusHot(2);
    cy.changeMaxHot(1);
    cy.checkHotButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Lok lak', 0);
    cy.checkTitleItemOfTheCurrentPage('Kara miso ramen', 8);
  });

  it('filter rank', function() {
    // connect
    cy.signIn('testvalidated', "test");
    cy.isLogged('testvalidated', 'egg');
    // check we are page 1
    cy.checkCurrentPage(1);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    // test min 5 max 5
    cy.changeMinusRank(5);
    cy.checkRankButtonState(false);
    cy.clickOnRankFilterButton();
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Filet mignon séché', 0);
    cy.checkTitleItemOfTheCurrentPage('Tarte thon-tomate', 8);
    // test min 4 max 5
    cy.changeMinusRank(4);
    cy.changeMaxRank(5);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Caramel mou au beurre salé', 8);
    // test min 4 max 4
    cy.changeMinusRank(4);
    cy.changeMaxRank(4);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Moelleux courgette-apéricube', 8);
    // test min 3 max 5
    cy.changeMinusRank(3);
    cy.changeMaxRank(5);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Baguette de pain', 8);
    // test min 3 max 4
    cy.changeMinusRank(3);
    cy.changeMaxRank(4);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Biscuit emmental', 8);
    // test min 3 max 3
    cy.changeMinusRank(3);
    cy.changeMaxRank(3);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Riz cantonais', 0);
    cy.checkTitleItemOfTheCurrentPage('Saucisses momies', 5);
    cy.countRecipesDisplayed(6);
    // test min 2 max 5
    cy.changeMinusRank(2);
    cy.changeMaxRank(5);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Baguette de pain', 8);
    // test min 2 max 4
    cy.changeMinusRank(2);
    cy.changeMaxRank(4);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Biscuit emmental', 8);
    // test min 2 max 3
    cy.changeMinusRank(2);
    cy.changeMaxRank(3);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Riz cantonais', 0);
    cy.checkTitleItemOfTheCurrentPage('Saucisses momies', 5);
    cy.countRecipesDisplayed(6);
    // test min 2 max 2
    cy.changeMinusRank(2);
    cy.changeMaxRank(2);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
    // test min 1 max 5
    cy.changeMinusRank(1);
    cy.changeMaxRank(5);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Baguette de pain', 8);
    // test min 1 max 4
    cy.changeMinusRank(1);
    cy.changeMaxRank(4);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Biscuit emmental', 8);
    // test min 1 max 3
    cy.changeMinusRank(1);
    cy.changeMaxRank(3);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Riz cantonais', 0);
    cy.checkTitleItemOfTheCurrentPage('Saucisses momies', 5);
    cy.countRecipesDisplayed(6);
    // test min 1 max 2
    cy.changeMinusRank(1);
    cy.changeMaxRank(2);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
    // test min 1 max 1
    cy.changeMinusRank(1);
    cy.changeMaxRank(1);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
    // test min 0 max 5
    cy.changeMinusRank(0);
    cy.changeMaxRank(5);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Baguette de pain', 8);
    // test min 0 max 4
    cy.changeMinusRank(0);
    cy.changeMaxRank(4);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Biscuit emmental', 8);
    // test min 0 max 3
    cy.changeMinusRank(0);
    cy.changeMaxRank(3);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkTitleItemOfTheCurrentPage('Riz cantonais', 0);
    cy.checkTitleItemOfTheCurrentPage('Saucisses momies', 5);
    cy.countRecipesDisplayed(6);
    // test min 0 max 2
    cy.changeMinusRank(0);
    cy.changeMaxRank(2);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
    // test min 0 max 1
    cy.changeMinusRank(0);
    cy.changeMaxRank(1);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
    // test min 0 max 0
    cy.changeMinusRank(0);
    cy.changeMaxRank(0);
    cy.checkRankButtonState(true);
    cy.checkCurrentPage(1);
    cy.checkNoRecipesDisplayed();
  });

  it('filter categories when "only validated recipes" is selected', function() {
    // connect
    cy.signIn('testvalidated', "test");
    cy.isLogged('testvalidated', 'egg');
    // filter by validated
    cy.checkOnlyValidatedRecipesButtonState(false);
    cy.clickOnOnlyValidatedRecipesButton();
    cy.checkOnlyValidatedRecipesButtonState(true);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 8);
    // filter by apero
    cy.topBarFilterClick(0);
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('apero#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by entree
    cy.topBarFilterClick(1);
    cy.checkTitleItemOfTheCurrentPage('entree#1', 0);
    cy.checkTitleItemOfTheCurrentPage('entree#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by plat
    cy.topBarFilterClick(2);
    cy.checkTitleItemOfTheCurrentPage('plat#2', 0);
    cy.countRecipesDisplayed(1);
    // filter by dessert
    cy.topBarFilterClick(3);
    cy.checkTitleItemOfTheCurrentPage('dessert#2', 0);
    cy.countRecipesDisplayed(1);
    // filter by boisson
    cy.topBarFilterClick(4);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by autres
    cy.topBarFilterClick(5);
    cy.checkTitleItemOfTheCurrentPage('autre#1', 0);
    cy.checkTitleItemOfTheCurrentPage('autre#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by tous
    cy.topBarFilterClick(6);
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 8);
  });

  it('filter categories when "only new recipes" is selected', function() {
    // connect
    cy.signIn('testvalidated', "test");
    cy.isLogged('testvalidated', 'egg');
    // filter by validated
    cy.checkOnlyNewRecipesButtonState(false);
    cy.clickOnOnlyNewRecipesButton();
    cy.checkOnlyNewRecipesButtonState(true);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
    // filter by apero
    cy.topBarFilterClick(0);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Chips de banane plantain', 8);
    cy.countRecipesDisplayed(2);
    // filter by entree
    cy.topBarFilterClick(1);
    cy.checkTitleItemOfTheCurrentPage('Beignets de maïs', 0);
    cy.checkTitleItemOfTheCurrentPage('Nems au porc', 8);
    // filter by plat
    cy.topBarFilterClick(2);
    cy.checkTitleItemOfTheCurrentPage('Riz cantonais', 0);
    cy.checkTitleItemOfTheCurrentPage('Rôti de porc moutarde et miel', 8);
    // filter by dessert
    cy.topBarFilterClick(3);
    cy.checkTitleItemOfTheCurrentPage('Charlotte aux fraises', 0);
    cy.checkTitleItemOfTheCurrentPage('Perles coco', 8);
    // filter by boisson
    cy.topBarFilterClick(4);
    cy.checkTitleItemOfTheCurrentPage('Sirop de fraise tagada', 0);
    cy.checkTitleItemOfTheCurrentPage('Milkshake framboises', 1);
    // filter by autres
    cy.topBarFilterClick(5);
    cy.checkTitleItemOfTheCurrentPage('Bagels', 0);
    cy.checkTitleItemOfTheCurrentPage('Foie gras au cognac', 1);
    // filter by tous
    cy.topBarFilterClick(6);
    cy.checkTitleItemOfTheCurrentPage('Mini-croissant pizza', 0);
    cy.checkTitleItemOfTheCurrentPage('Cake jambon fumé et fromage à raclette', 8);
  });

  it('filter categories when "only deleted recipes" is selected', function() {
    // connect
    cy.signIn('testdeleted', "test");
    cy.isLogged('testdeleted', 'egg');
    // filter by validated
    cy.checkOnlyDeletedRecipesButtonState(false);
    cy.clickOnOnlyDeletedRecipesButton();
    cy.checkOnlyDeletedRecipesButtonState(true);
    // check the recipes displayed
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 8);
    // filter by apero
    cy.topBarFilterClick(0);
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('apero#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by entree
    cy.topBarFilterClick(1);
    cy.checkTitleItemOfTheCurrentPage('entree#1', 0);
    cy.checkTitleItemOfTheCurrentPage('entree#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by plat
    cy.topBarFilterClick(2);
    cy.checkTitleItemOfTheCurrentPage('plat#1', 0);
    cy.countRecipesDisplayed(1);
    // filter by dessert
    cy.topBarFilterClick(3);
    cy.checkTitleItemOfTheCurrentPage('dessert#1', 0);
    cy.countRecipesDisplayed(1);
    // filter by boisson
    cy.topBarFilterClick(4);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by autres
    cy.topBarFilterClick(5);
    cy.checkTitleItemOfTheCurrentPage('autre#1', 0);
    cy.checkTitleItemOfTheCurrentPage('autre#2', 1);
    cy.countRecipesDisplayed(2);
    // filter by tous
    cy.topBarFilterClick(6);
    cy.checkTitleItemOfTheCurrentPage('apero#1', 0);
    cy.checkTitleItemOfTheCurrentPage('boisson#1', 8);
  });
})