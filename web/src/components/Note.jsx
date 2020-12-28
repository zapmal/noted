import React from 'react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import styled from 'styled-components';

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
  margin-left: auto;
`;

const Note = ({ note }) => {
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
        <UserActions>
          <em>Favorites:</em> {note.favoriteCount}
        </UserActions>
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;