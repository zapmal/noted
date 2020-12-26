import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites - Noted';
  }, []);

  return (
    <div>
      <p>These are my favorite notes!</p>
    </div>
  );
};

export default Favorites;