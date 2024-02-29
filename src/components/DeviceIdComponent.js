import {Image, StyleSheet, Text, View} from 'react-native';

import {IMAGES} from '../utils/images';
import useDeviceID from '../customHooks/useDeviceId';

const DeviceIdComponent = () => {
  //Custom hook to get the Device Id information
  const {deviceID = {}} = useDeviceID();

  const renderBatteryTitle = (title, value) => (
    <View style={styles.statusText}>
      <Text style={styles.descriptionText}>{title}</Text>
      <Text style={styles.descriptionText}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}> Device Information </Text>
        <Image source={IMAGES.deviceId} style={styles.imageStyle} />
      </View>
      {renderBatteryTitle('Your Device Id is: ', deviceID)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
      paddingHorizontal: 120
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'white',
  },
  imageStyle: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  statusText: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 13,
    color: '#FAF9F6',
  },
});

export default DeviceIdComponent;
