import React from 'react';
import ReactDOM from 'react-dom';
import { 
  ApolloClient, 
  ApolloProvider, 
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';
import { cache } from './cache';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  typeDefs,
  connectToDevTools: true,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));