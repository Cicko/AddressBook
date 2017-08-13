const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://zsjqqtmqoestez:76bf7b30369bf85171501e9a60805af08a072bfc07331c90a19ad2c7410314a6@ec2-23-21-96-159.compute-1.amazonaws.com:5432/d1avkdebeu43sq';

pg.defaults.ssl = true;

pg.connect(connectionString, function(err, client, done) {
  client.query('CREATE TABLE accounts(email VARCHAR(50) not null PRIMARY KEY, password VARCHAR(50) not null)', (err, result) => {
    done();
  });
});
