const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const PORT = 4000;
const app = express();

const typeDefs = gql `
  type Query{
    getPrice( marca: String! , tipo: String!): precio   
  }
  type precio{
    precio: Int     
  }
`

const precio = [140, 150, 160, 170];

const resolvers = {
        Query: {
            getPrice: (marca, tipo) => precio
        }
    }
    //const schema = makeExecutableSchema({ typeDefs, resolvers })
const server = new ApolloServer({ typeDefs, resolvers });
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
server.applyMiddleware({ app });
//app.use('/graphiql', server)
app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)