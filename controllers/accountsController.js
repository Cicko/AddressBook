const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://zsjqqtmqoestez:76bf7b30369bf85171501e9a60805af08a072bfc07331c90a19ad2c7410314a6@ec2-23-21-96-159.compute-1.amazonaws.com:5432/d1avkdebeu43sq';

pg.defaults.ssl = true;

// Display book create form on GET
exports.createAccount = function(req, res) {
    var requestAsJson = JSON.stringify(req.body);
    res.setHeader('Content-Type', 'application/json');
    console.log('The POST data received was: ' + requestAsJson);

    pg.connect(connectionString, function(err, client, done) {
      client.query('INSERT INTO accounts VALUES(email VARCHAR(50) not null PRIMARY KEY, password VARCHAR(50) not null)', (err, result) => {
        if (err);
        done();
      });
    });
    res.end('User created!');
};
