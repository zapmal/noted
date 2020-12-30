import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Note from '../components/Note';
import { GET_NOTE } from '../graphql/query';

const EditNote = (props) => {
  const id = props.match.params.id;

  const { data, loading, error } = useQuery(GET_NOTE, { variables:  { id } });

  if (loading) return <p>Loading...</p>

  if (error) return <p>Note not found.</p>

  return <Note note={data.note} />
};

export default EditNote;