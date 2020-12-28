import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
 
import UserForm from '../components/UserForm';
import { SIGNIN_USER } from '../graphql/mutation';
import { isLoggedInVar } from '../cache';

const SignIn = (props) => {
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      isLoggedInVar(true);
      props.history.push('/');
    }
  });

  useEffect(() => document.title = 'Sign In - Noted', []);

  return (
    <React.Fragment>
      <UserForm action={signIn} formType='signin' />

      {loading && <p>Loading...</p>}

      {error && <p>Error.</p>}
    </React.Fragment>
  )
};

export default SignIn;