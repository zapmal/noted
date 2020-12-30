import styled from 'styled-components';

import Button from './Button';

const ButtonAsLink = styled(Button)`
  display: inline-block;
  a:link, a:visited {
    color: #ffffff;
    text-decoration: none;
  }
`;

export default ButtonAsLink;