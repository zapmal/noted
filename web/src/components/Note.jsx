import React from 'react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import UserNote from './UserNote';
import { IS_LOGGED_IN } from '../graphql/query';

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

const MetaInformation = styled.div`
  padding-right: 1em;
`;

const UserActions = styled.div`
  margin-left: 2em;
  p {
    margin-left: 1em;
    display: inline;
  }
`;

const Note = ({ note }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error.</p>

  return (
    <StyledNote>
      <MetaData>
        <MetaInformation>
          <img 
            src={note.author.avatar}
            alt='{note.author.username} avatar'
            height='50px'
          />
        </MetaInformation>
        <MetaInformation>
          By {note.author.username} <br/>
          {dayjs(note.createdAt).format('DD/MM/YYYY')}
        </MetaInformation>

        {data.isLoggedIn && 
          <UserActions> 
            <UserNote note={note}/>
          </UserActions>
        }
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;