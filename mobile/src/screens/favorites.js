import React from 'react';
import { Text, View } from 'react-native';

const Favorites = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignIntems: 'center' }}>
      <Text>Favorites</Text>
    </View>
  );
};

Favorites.navigationOptions = {
  title: 'Favorites'
};

export default Favorites;