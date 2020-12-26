const express = require('express');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
require('dotenv').config();

const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const database = require('./database');

const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(helmet({
  contentSecurityPolicy: (process.env.NODE_ENV === 'production')
  ? undefined
  : false
}));
app.use(cors());

database.connect(DB_HOST);

const getAuthenticatedUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid session.');
    }
  }
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getAuthenticatedUser(token);
    return { models, user };
  } 
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);