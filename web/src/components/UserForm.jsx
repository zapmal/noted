import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';

import Button from './Button';

const Wrapper = styled.div`
  border: 3px solid #f5f4f0;
  border-radius: 5px;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    transition: all 100ms ease-in;
  }

  input:focus {
    border: 3px dotted lightgray;
  }

  button {
    margin: 0 auto;
  }
`;

const Image = styled.img`
  display: block;
  margin: 15px auto;
`;

const MotivationalMessage = styled.p`
  text-align: center;
`;

const UserForm = (props) => {
  const [values, setValues] = useState();

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >
        {props.formType === 'signup' && (
          <React.Fragment>
            <label htmlFor='username'>Username:</label>
            <input
              required
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              onChange={onChange}
            />
          </React.Fragment>
          )}
            <label htmlFor='email'>Email:</label>
            <input
              required
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              onChange={onChange}
            />
            <label htmlFor='password'>Password:</label>
            <input
              required
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={onChange}
          />
        <Button type='submit'>Submit</Button>
      </Form>

      <Image src={logo} alt='App Logo' height='40'/>
      <MotivationalMessage>
        {props.formType === 'signin' ? 'Welcome.' : 'Bring your notes to life.'}
      </MotivationalMessage>
    </Wrapper>
  );
};

export default UserForm;