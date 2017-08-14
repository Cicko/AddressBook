
'use strict';

module.exports = function(app) {
  var accountsController = require('../controllers/accountsController.js')
  var contactsController = require('../controllers/contactsController.js')
  app.route('/signup').post(accountsController.createAccount)

  app.route('/login').post(accountsController.login);

  app.route('/accounts')
    .get(accountsController.getAllAccounts)
    .delete(accountsController.deleteAllAccounts);

  app.route('/contacts')
    .post(contactsController.createContact);

  app.get("/",(req, res) => {
    res.redirect('https://documenter.getpostman.com/view/2536086/addressbook-srtv/6n61Dfv')
    // Remove the following comment and comment above to avoid redirect to the documentation.
    /*res.status(200).json({paths: {
      '/signup': 'Create an account',
      '/login': 'Log in',
      '/contacts': 'Create a contact for specific account'
    }});
    */
  });

}
