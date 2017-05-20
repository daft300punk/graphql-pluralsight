const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'MeType',

  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getContests(obj);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    }
  }
});
