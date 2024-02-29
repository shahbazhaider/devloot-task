import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import useGyroscope from '../customHooks/useGyroscope';
import {IMAGES} from '../utils/images';

const GyroscopeInfoComponent = () => {
  const {gyroscopeData} = useGyroscope(); // Custom Hook to get Gyroscope Information

  const renderDetails = (title, value) => (
    <View style={styles.statusText}>
      <Text style={styles.descriptionText}>{title}</Text>
      <Text style={styles.descriptionText}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.batteryInfoText}> Gyroscope Information </Text>
        <Image source={IMAGES.sensors} style={styles.imageStyle} />
      </View>
      {renderDetails('Device Orientation is :', gyroscopeData?.orientation)}
      {renderDetails('Rotation Rate X:', gyroscopeData?.rotationRateX)}
      {renderDetails('Rotation Rate Y:', gyroscopeData?.rotationRateY)}
      {renderDetails('Rotation Rate Z:', gyroscopeData?.rotationRateZ)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      marginTop: 20
  },
  descriptionText: {
    fontSize: 13,
    color: '#FAF9F6',
  },
  imageStyle: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  batteryInfoText: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'white',
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  statusText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GyroscopeInfoComponent;
