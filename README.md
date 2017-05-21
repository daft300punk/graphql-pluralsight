## GraphQL Query Language

#### Fields
+ Queries can be given names.
+ Modeled after functions. Query can accept arguments.
+ Fields: Scalar vs Complex.
+ Resolver functions determine the return value of a field in query.
+ The innermost level should be a scalar field.
+ Specify types for fields and arguments
+ <s>GraphQLList</s>

#### Variables
+ $currentUserName - $ prefix
+ Pass it in Query as parameter
 + ```query TestQuery($currentUserName: String!)```

#### Directives
+ Using just field arguments not enough.
+ ```"includeRepos": "true"```, customize response on the basis of boolean value
+ Use directives to alter graphQL runtime execution
+ Use prefix ```@```
+ Can accept arguments
```javascript
query myQuery($someTest: Boolean!) {
  experimentalField @skip(if: $someTest)
}
```
```javascript
query myQuery($someTest: Boolean!) {
  experimentalField @include(if: $someTest)
}
```

#### Aliases
+ Mismatch when client uses different property names than server
+ Use aliases to ask for same fields more than once
```javascript
query myQuery($userName1: string!, $userName2: string!) {
  user1: user(username: $userName1) {
    id,
    company,
    avatar_url
  },
  user2: user(username: $userName2) {
    id,
    company,
    avatar
  }
}
```

#### Fragments
+ Composability
```javascript
fragment UserInfo on GithubUser {
  // query here
}
```
+ <s>Usage</s>

#### Inline fragments
+ Query a field with multiple types
```javascript
{
  github {
    repo(name: 'graphql', ownerUsername: 'facebook') {
      commits {
        message
        author {
          ... on GithubUser {
            login
          }
          ... on GithubCommitAuthor {
            email
          }
        }
      }
    }
  }
}
```

#### Mutations
+ Side effects
```javascript
mutation AddResource($input: createLinkInput!) {
  createLink(input: $input) {
    //...
  }
}
```

#### Hello World
+ Define a schema first
```javascript
  const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType', // any unique name
    // all fields defined here are available on top level query scope
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      }
    }
  });

  const ncSchema = new GraphQLSchema({
    query: RootQueryType // defined above
    //mutation: ''
  });
```

#### express-graphql
+ Configuring graphql on an express server
```javascript
  const graphQLHTTP = require('express-graphql');

  app.use('/graphql', graphQLHTTP({
    schema: ncSchema,
    graphiql: true
  }))
```
