const AWS = require('aws-sdk');
const { ApolloServer, gql } = require('apollo-server-lambda');
const { convertTipo, convertMarca } = require('./textToNumber');

const lambda = new AWS.Lambda({  
  region: 'us-east-1'
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    precio(tipo: String!, marca: String!): Float
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    precio: async (_, { tipo, marca }) => {
      const params = {
        FunctionName: 'sageMakerPriceModelConsumer',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ data: `${convertMarca(marca)},${convertTipo(tipo)}`})
      };
  
      return new Promise((resolve, reject) => {
        lambda.invoke(params, (error, data) => {
          if (error) {
            console.error(JSON.stringify(error));
            reject(Error(`Price optimization error: ${JSON.stringify(error)}`));
          } else if (data) {
            resolve(parseFloat(data.Payload));
          }
        });
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();
