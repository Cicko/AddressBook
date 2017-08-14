var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe("Testing accounts", () => {
  it("Can create account", done => {
    request.post({
      url:'http://localhost:' + process.env.PORT + '/signup',
      form: {
        email: "test@gmail.com",
        password: "1234ABCabc$"
      }
    },
    (err,httpResponse,body) => {
      expect(JSON.parse(body).message).to.equal('User created! Now you can log in.');
      done();
    });
  });

  it("Can not create account with a password not strong enough", done => {
    request.post({
      url:'http://localhost:' + process.env.PORT + '/signup',
      form: {
        email: "test@gmail.com",
        password: "1234"
      }
    },
    (err,httpResponse,body) =>{
      expect(JSON.parse(body).message).to.equal('Password is not strong enough');
      done();
    });
  });

  afterEach(() => {
    request.delete({url: 'http://localhost:' + process.env.PORT + '/accounts'})
  });
});


describe("Testing login", () => {
  afterEach(function() {
    request.delete({url: 'http://localhost:' + process.env.PORT + '/accounts'})
  });

  it("Can check correct login", done => {
    request.post({
      url:'http://localhost:' + process.env.PORT + '/signup',
      form: {
        email: "test@gmail.com",
        password: "1234ABCabc$"
      }
    },
    (err,httpResponse,body) => {
      request.post({
        url:'http://localhost:' + process.env.PORT + '/login',
        form: {
          email: "test@gmail.com",
          password: "1234ABCabc$"
        }
      }, (err, res, body) => {
        expect(JSON.parse(body).token).to.not.equal('');
        done();
      });
    });
  });

  it("Can check incorrect password when login", done => {
    request.post({
      url:'http://localhost:' + process.env.PORT + '/signup',
      form: {
        email: "test2@gmail.com",
        password: "1234ABCabc$"
      }
    },
    (err,httpResponse,body) => {
      request.post({
        url:'http://localhost:' + process.env.PORT + '/login',
        form: {
          email: "test2@gmail.com",
          password: "1234"
        }
      }, (err, res, body) => {
        expect(JSON.parse(body).message).to.equal('Invalid password');
        done();
      });
    });
  });

  it("Can check if user don't exist", done => {
    request.post({
      url:'http://localhost:' + process.env.PORT + '/login',
      form: {
        email: "test@gmail.com",
        password: "1234ABCabc$"
      }
    },
    (err,httpResponse,body) => {
        expect(JSON.parse(body).message).to.equal("This user doesn't exist");
        done();
    });
  });
});



describe("Testing contacts", () => {
    it ("Can create contact", done => {
      request.post({
        url:'http://localhost:' + process.env.PORT + '/signup',
        form: {
          email: "test@gmail.com",
          password: "1234ABCabc$"
        }
      },
      (err,httpResponse,body) => {
        request.post({
          url:'http://localhost:' + process.env.PORT + '/login',
          form: {
            email: "test@gmail.com",
            password: "1234ABCabc$"
          }
        }, (err, res, body) => {
          var token = JSON.parse(body).token;
          request.post({
            url: 'http://localhost:' + process.env.PORT + '/contacts',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            form: {
              fullname: "Tested Testing",
              phone: "123456789",
              address: 'some address',
              otherAttribute: 'Wonderful attribute for this contact'
            }
          }, (err, res2, body2) => {
            expect(JSON.parse(body2).message).to.equal('Contact added for test@gmail.com')
            done();
          });
        });
      });
    });
});
