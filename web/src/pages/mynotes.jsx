import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../graphql/query';

const MyNotes = () => {
  const { data, loading, error } = useQuery(GET_MY_NOTES);

  useEffect(() => document.title = 'My Notes - Noted', []);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error loading your notes.</p>

  if (data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />
  } else {
    return <p>No notes yet. Go and create one!</p>
  }
};

export default MyNotes;