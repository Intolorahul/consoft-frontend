import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../constants';
import CustomCalender from '../Stock/Tools/CustomCalender';

const Tasks = () => {
  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Tasks</Text>
    // </View>
    <View>
      <CustomCalender />
    </View>
  );
};
export default Tasks;
