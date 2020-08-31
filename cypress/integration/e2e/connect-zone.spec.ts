describe('connect-zone component', function() {

  beforeEach(function () {
    // open the web site
    cy.visit('/');
  })

  it('Account creation', function() {
    // check that the user form is not visible
    cy.get('user-form .formContainer').should('exist');
    cy.get('user-form .formContainer').should('not.be.visible');
    // click on the 'not member' link
    cy.openCreateAccount();
    // check that the user form is open
    cy.get('user-form .formContainer').should('be.visible');
    // populate the user form to create a user
    cy.populateUserForm('testlogin', 'testpassword', 'toto@toto.fr', 12);
    // check that the good avatar is selected in the form
    cy.isAvatarSelected(12);
    // cancel the user form
    cy.closeUserForm();
    cy.get('user-form .formContainer').should('not.be.visible');
    // re-open it
    cy.openCreateAccount();
    cy.get('user-form .formContainer').should('be.visible');
    // check that inputs are empty
    cy.checkUserFormValues('', '', '', 5);
    // populate the user form to create a user
    cy.populateUserForm('test', 'test', 'toto@toto.fr', 22);
    cy.isAvatarSelected(22);
    cy.validateUserForm();
    cy.haveNotifWithType('Dear test, your account has been created! Welcome among us :)Welcome test !', 'success');
    // check that test is connected now !
    cy.isLogged('test', 'kiwi');
  });

  it('App connection', function() {
    // sign in with a bad login or password
    cy.signIn('stevejobs', 'applesucks');
    // check that we have an error notification
    cy.haveNotifWithType('Wrong login and/or password ! Try again ;)', 'error');
    // clear inputs
    cy.clearLoginPassword();
    cy.wait(1000);
    // sign in
    cy.signIn('funnybobby', "190281");
    // check that the login/password section disappear
    cy.get('connect-zone .unconnected').should('not.exist');
    // check that we have a success notification
    cy.haveNotifWithType('Welcome funnybobby !', 'success');
    // check that funnybobby is connected now !
    cy.isLogged('funnybobby', 'egg');
  });

  it('App helper', function(){
    // sign in
    cy.signIn('test', "test");
    // check that the login/password section disappear
    cy.get('connect-zone .unconnected').should('not.exist');
    // check helper is not opened
    cy.get('help .helpContainer').should('not.be.visible');
    // check that help link is present click on it
    cy.get('connect-zone .userDetails .actions span')
      .eq(0)
      .click();
    // check helper is opened
    cy.get('help .helpContainer').should('be.visible');
    // close the helper
    cy.get('help .helpContainer .icon-cancel-circled2').click()
    cy.get('help .helpContainer').should('not.be.visible');
  });

  it('Update user parameter', function(){
    // sign in
    cy.signIn('test', "test");
    // check that the login/password section disappear
    cy.get('connect-zone .unconnected').should('not.exist');
    // check that the parameter link is present and click on it
    cy.get('connect-zone .userDetails .actions span')
    .eq(1)
    .click();
    // check user form values
    cy.checkUserFormValues('test', 'test', 'toto@toto.fr', 22);
    // update user paramaters
    cy.clearUserFormValues();
    cy.populateUserForm('testlogin', 'testpassword', 'toto@toto.fr', 12);
    cy.validateUserForm();
    // check the changements
    cy.isLogged('testlogin', 'citrouille');
  });

  it('App unconnection', function(){
    // sign in
    cy.signIn('testlogin', "testpassword");
    // check that the login/password section disappear
    cy.get('connect-zone .unconnected').should('not.exist');
    // check that testlogin is connected now !
    cy.isLogged('testlogin', 'citrouille');
    // click on the unconnection link
    cy.get('connect-zone .userDetails .actions span')
    .eq(2)
    .click();
    // check that the login/password section appears
    cy.get('connect-zone .unconnected').should('exist');
  });

})