import React from 'react';

import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Pages />
    </div>
  );
};

export default App;