import { InMemoryCache, Reference, makeVar } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        }
      }
    }
  }
});

const isLoggedInVar = makeVar(!!localStorage.getItem('token'));

export {
  isLoggedInVar,
  cache,
};