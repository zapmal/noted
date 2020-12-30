import React from 'react';
import { useQuery } from '@apollo/client';

import Note from '../components/Note';
import { GET_NOTE } from '../graphql/query';

const NotePage = (props) => {
  const id = props.match.params.id;
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error.</p>

  return <Note note={data.note} />
};

export default NotePage;