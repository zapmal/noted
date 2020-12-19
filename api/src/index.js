require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const models = require('./models');
const database = require('./database');

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Zondazx'
      });
    }
  }
};

const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

database.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({
  app,
  path: '/api'
});

app.listen({
    port
  }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);