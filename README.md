# GraphQL Query Language
___

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
query myQuery($someTest; Boolean) {
  experimentalField @skip(if: $someTest)
}
```
```javascript
query myQuery($someTest: Boolean) {
  experimentalField @include(if: $someTest)
}
```
+ 
