import React from 'react';
import { Text, View, Button } from 'react-native';

const Feed = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignIntems: 'center' }}>
      <Text>Feed</Text>
      <Button title='Keep Reading' onPress={() => props.navigation.navigate('Note')} />
    </View>
  );
};

Feed.navigationOptions = {
  title: 'Feed'
};

export default Feed;