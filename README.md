# REST API Backend for AddressBook

## API DOCUMENTATION
[Documentation](https://documenter.getpostman.com/view/2536086/addressbook-srtv/6n61Dfv)

## Description
The addressbook backend is used by your users to perform the following tasks:
 - Register new account
 - Manage their contacts


## API
 - It uses Node.js with Express framework.
 - HTTP responses follows best practices in the industry.
 - API communicate with their clients using JSON.
 - Stateless authentication. The server uses JWT so it just give you a token and with it you can make following requests.

## User accounts
 - All user accounts are stored in MongoDB.
 - Registrations are done with email+password.
 - Functionality:
   - User registration
   - User login

## Contact data
 - All the user's contacts are stored in Firebase.
 - With the api you just can create new contact using token (more info in Documentation).
 - GET, UPDATE or DELETE contacts are done directly in the Firebase dashboard.


## Links

 - [Heroku link](https://addressbook-rudy.herokuapp.com)
 - [MongoDB](https://www.mlab.com/databases/heroku_fkcp7hp5)
   -  DB User: guest
   -  DB Password: guest
