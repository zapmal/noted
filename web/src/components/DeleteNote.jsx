import React from 'react'; 
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import Button from './Button';
import { DELETE_NOTE } from '../graphql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../graphql/query';

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  display: inline;
  margin-left: 1em;

  &:active {
    background-color: #ff503c;
  }
`;

const DeleteNote = (props) => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteID
    },
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      props.history.push('/mynotes');
    }
  });

  return <DeleteButton onClick={deleteNote}>Delete Note</DeleteButton>
};

export default withRouter(DeleteNote);