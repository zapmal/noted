import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../graphql/query';
import { EDIT_NOTE } from '../graphql/mutation';

const EditNote = (props) => {
  const id = props.match.params.id;

  const { data, loading, error } = useQuery(GET_NOTE, { variables:  { id } });
  const { 
    data: userData, 
    loading: userDataLoading, 
    error: userDataError 
  } = useQuery(GET_ME);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: { id },
    onCompleted: () => props.history.push(`/note/${id}`)
  });

  if (loading || userDataLoading) return <p>Loading, hang in there!</p>

  if (error || userDataError) {
    return <p>Error while fetching data, check your connection and try again.</p>
  }

  if (userData.me.id !== data.note.author.id) {
    console.log(userData);
    return (
      <React.Fragment>
        <h2>What are you doing here?🤔</h2>
        <p>You are not the author of this note.</p>
      </React.Fragment>
    );
  }

  return <NoteForm content={data.note.content} action={editNote} />
};

export default EditNote;