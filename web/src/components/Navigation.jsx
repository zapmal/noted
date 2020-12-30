import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
    display: flex;
    justify-content: center;

    li {
      margin-right: 10px;
      display: inline-flex;
    }
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }
  
  a:hover,
  a:focus {
    color: #0077cc;
  }

  span {
    margin-right: 5px;
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <li>
          <Link to='/'>
            <span aria-hidden='true' role='img'>🏠</span>
            Home
          </Link>
        </li>
        <li>
          <Link to='/mynotes'>
            <span aria-hidden='true' role='img'>📝</span>
            My Notes
          </Link>
        </li>
        <li>
          <Link to='/favorites'>
            <span aria-hidden='true' role='img'>⭐</span>
            Favorites
          </Link>
        </li>
        <li>
          <Link to='/new'>
            <span aria-hidden='true' role='img'>🆕</span>
            Create a note
          </Link>
        </li>
      </NavList>
    </Nav>
  );
};

export default Navigation;