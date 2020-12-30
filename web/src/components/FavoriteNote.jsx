import React, { useState } from 'react'; 
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import Button from './Button';
import { TOGGLE_FAVORITE } from '../graphql/mutation';
import { GET_MY_FAVORITES } from '../graphql/query';

const FavoriteButton = styled(Button)`
  background-color: #dabe23;
  display: inline;
  margin-left: 1em;

  &:active {
    background-color: #f3d423;
  }
`;

const FavoriteNote = (props) => {
  const [favoriteCount, setFavoriteCount] = useState(props.favoriteCount);
  const [favorited, setFavorited] = useState(
    props.me.favorites.filter(note => note.id === props.noteID).length > 0
  );
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: props.noteID },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  return (
    <React.Fragment>
      {favorited ? (
        <FavoriteButton
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setFavoriteCount(favoriteCount - 1);
          }}
        >
          Remove Favorite
        </FavoriteButton>
      ) : (
        <FavoriteButton
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setFavoriteCount(favoriteCount + 1);
          }}
        >
          Add to favorites
        </FavoriteButton>
      )}
      <p>Favorites: {favoriteCount}</p>
    </React.Fragment>
 );
};

export default FavoriteNote;