import React from 'react';
import styled from 'styled-components';
import { useQuery, useApolloClient } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import logo from '../img/logo.svg';
import ButtonAsLink from './ButtonAsLink';
import { isLoggedInVar } from '../cache';
import { IS_LOGGED_IN } from '../graphql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = (props) => {
  const { data } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();

  return (
    <HeaderBar>
      <img src={logo} alt='App Logo' height='40'/>
      <LogoText>Noted</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              client.cache.gc()
              localStorage.removeItem('token');
              isLoggedInVar(false);
              props.history.push('/');
            }}
          >
            Log out
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or {' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);