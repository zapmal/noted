
import React from 'react';
import { Text, View } from 'react-native';

const MyNotes = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignIntems: 'center' }}>
      <Text>My Notes</Text>
    </View>
  );
};

MyNotes.navigationOptions = {
  title: 'My Notes'
};

export default MyNotes;