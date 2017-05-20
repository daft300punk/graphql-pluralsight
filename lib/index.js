const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const ncSchema = require('../schema');
const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const app = require('express')();

app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true
}))

const PORT = process.env.PORT || 3000;
app.listen(PORT);
