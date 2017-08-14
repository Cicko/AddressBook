# REST API Backend for AddressBook

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
 - With the api you just can create new contact.
 - GET, UPDATE or DELETE contacts are done directly in the Firebase dashboard. 
