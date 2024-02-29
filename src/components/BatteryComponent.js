import {Image, StyleSheet, Text, View} from 'react-native';

import {IMAGES} from '../utils/images';
import useBatteryInfo from '../customHooks/useBatteryInfo';

const BatteryComponent = () => {
  //Custom hook to get the battery information
  const {batteryInfo = {}} = useBatteryInfo();
  const {level = '', status = ''} = batteryInfo ?? {};

  const getBatteryImage = () => {
    let batteryImage = IMAGES.batteryNotCharging;

    if (status === 'Charging') {
      batteryImage = IMAGES.batteryCharging;
    }

    if (status === 'Full') {
      batteryImage = IMAGES.batteryFull;
    }

    return batteryImage;
  };

  const renderBatteryTitle = (title, value) => (
    <View style={styles.statusText}>
      <Text style={styles.descriptionText}>{title}</Text>
      <Text style={styles.descriptionText}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.batteryInfoText}> Battery Information </Text>
        <Image source={getBatteryImage()} style={styles.imageStyle} />
      </View>
      {renderBatteryTitle('Your Device Battery Level is: ', `${level}%`)}
      {renderBatteryTitle('Your Device Battery Status is: ', status)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  batteryInfoText: {
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 13,
    color: '#FAF9F6',
  },
});

export default BatteryComponent;
