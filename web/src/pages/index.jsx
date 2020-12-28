import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';

import { IS_LOGGED_IN } from '../graphql/query';

import Home from './home';
import SignUp from './signup';
import SignIn from './signin';
import Favorites from './favorites';
import NotePage from './note';
import MyNotes from './mynotes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error.</p>

  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect 
            to={{ pathname: '/signin', state: { from:  props.location } }}
          />
        )
      }
    />
  );
};

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/mynotes' component={MyNotes} />
        <PrivateRoute path='/favorites' component={Favorites} />
        <Route path='/note/:id' component={NotePage} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
      </Layout>
    </Router>
  );
};

export default Pages;