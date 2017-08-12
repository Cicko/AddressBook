var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe("testing requests", function() {
  it("Post for create account", function(done) {
    request.post({
      url:'http://localhost:3000/createAccount',
      form: {
        email: "test@gmail.com"
      }
    },
    function(err,httpResponse,body){
      expect(JSON.parse(body).email).to.equal('test@gmail.com');
      done();
    });
  });
});
