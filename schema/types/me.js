const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

const pgdb = require('../../database/pgdb');
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
    }
  }
});
