import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../../Components';

const Items = () => {
  return (
    <View>
      <HeaderBar right={true} />
      <Text>Items stock</Text>
    </View>
  );
};

export default Items;
