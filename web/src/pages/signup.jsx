import React, { useEffect } from 'react';
import { useMutation, } from '@apollo/client';

import { SIGNUP_USER } from '../graphql/mutation';
import { isLoggedInVar } from '../cache';
import UserForm from '../components/UserForm';

const SignUp = (props) => {
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      isLoggedInVar(true);
      props.history.push('/');
    }
  });

  useEffect(() => document.title = 'Sign Up - Noted', []);

  return (
    <React.Fragment>
      <UserForm action={signUp} formType='signup'/>
      
      {loading && <p>Loading...</p>}

      {error && <p>Error...</p>}
    </React.Fragment>
  );
};

export default SignUp;