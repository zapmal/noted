import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import LinkAsButton from './LinkAsButton';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';
import { GET_ME } from '../graphql/query';

const UserNote = (props) => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error.</p>

  return (
    <React.Fragment>
      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <LinkAsButton>
            <Link to={`/edit/${props.note.id}`}>Edit</Link>
          </LinkAsButton>

          <DeleteNote noteID={props.note.id} />
        </React.Fragment>
      )}
      <FavoriteNote 
        me={data.me} 
        noteID={props.note.id} 
        favoriteCount={props.note.favoriteCount}
      />
   </React.Fragment>
  );
};

export default UserNote;