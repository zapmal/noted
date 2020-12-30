import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { NEW_NOTE } from '../graphql/mutation';
import { GET_NOTES, GET_MY_NOTES } from '../graphql/query';

import NoteForm from '../components/NoteForm';

const NewNote = (props) => {
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  useEffect(() => document.title = 'New Note - Noted',  []);

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}

      {error && <p>Error saving the note.</p>}

      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;