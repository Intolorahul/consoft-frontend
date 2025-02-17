import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  LogBox,
} from 'react-native';
import { icons, COLORS, SIZES, FONTS, images } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { InProgressModal, DoneModal } from '../TaskModal';
//saurabh
import UserAssignWorks from './UserAssignWorks';

const UserDashboard = () => {
  // refresh
  function delay(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const loadMore = React.useCallback(async () => {
    setLoading(true);
    delay(2000).then(() => setLoading(false));
  }, [loading]);

  const [inProgressModal, setinProgressModal] = React.useState(false);
  const [doneModal, setdoneModal] = React.useState(false);
  const [inProgressModalnum, setinProgressModalNum] = React.useState(false);
  const [doneModalnum, setdoneModalNum] = React.useState(false);

  const handleInProgressTask = () => {
    setinProgressModalNum(true);
    setinProgressModal(true);
  };
  const handleDoneTask = () => {
    setdoneModalNum(true);
    setdoneModal(true);
  };

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <ScrollView

      contentContainerStyle={{
        flex: 1
      }}
      refreshControl={
        <RefreshControl
          progressBackgroundColor="white"
          tintColor="red"
          refreshing={loading}
          onRefresh={loadMore}
        />
      }
    >
      <UserAssignWorks loading={loading} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: 'absolute',
          top: SIZES.height * 0.7,
          left: 0,
          right: 0,
          // bottom:0,
          marginHorizontal: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          paddingVertical: SIZES.radius,
          borderRadius: SIZES.base,
          // backgroundColor: COLORS.lightblue_500,
          // ...styles.shadow,
        }}>
        {/* <TouchableOpacity 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            padding: 10,
            borderRadius: 5,
            ...styles.shadow,
          }}
          onPress={() => handleInProgressTask()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={icons.inprogress} style={{height: 25, width: 25}} />
            <Text style={{...FONTS.h3, color: COLORS.darkGray, left: 10}}>
              Task In Progress
            </Text>
          </View>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>2</Text>
        </TouchableOpacity> */}
        {/* {inProgressModalnum && (
          <InProgressModal
            inProgressModal={inProgressModal}
            setinProgressModal={setinProgressModal}
          />
        )} */}

     
        <TouchableOpacity
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            width: "45%",
            padding: 10,
            borderRadius: 5,
            ...styles.shadow,
          }}
          onPress={() => {
            handleDoneTask()
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={icons.done} style={{ height: 22, width: 22 }} />
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray, left: 10 }}>
              Done Tasks !
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            width: "45%",
            padding: 10,
            borderRadius: 5,
            ...styles.shadow,
          }}
          onPress={() => {
            // handleDoneTask()
            navigation.navigate('ViewReport');

          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={icons.report} style={{ height: 24, width: 24 }} />
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray, left: 10 }}>
              View Reports
            </Text>
          </View>
        </TouchableOpacity>
        {doneModalnum && (
          <DoneModal doneModal={doneModal} setdoneModal={setdoneModal} loading={loading} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default UserDashboard;
