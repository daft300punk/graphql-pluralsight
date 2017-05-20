const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const query = '{hello}';

const ncSchema = require('../schema');
const { graphql } = require('graphql');

graphql(ncSchema, query).then(result => {
  console.log(result);
});
