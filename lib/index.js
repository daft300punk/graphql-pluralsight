const { nodeEnv } = require('./util');
const DataLoader = require('dataloader');

console.log(`Running in ${nodeEnv} mode...`);

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');
const app = require('express')();

const pg = require('pg');

const pgConfig = require('../config/pg')[nodeEnv];

const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);

  app.use('/graphql', (req, res) => {
    const loaders = {
      userByIds: new DataLoader(pgdb.getUsersByIds)
    };
    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: { pgPool, mPool, loaders }
    })(req, res);
  });

  const PORT = 3000;
  app.listen(PORT);
});
