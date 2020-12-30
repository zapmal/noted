import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../graphql/query';

const Favorites = () => {
  const { data, loading, error } = useQuery(GET_MY_FAVORITES);

  useEffect(() => document.title = 'Favorites - Noted', []);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error loading your favorites.</p>

  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.notes} />
  } else {
    return <p>No favorite notes yet. Go and mark some!</p>
  }
};

export default Favorites;