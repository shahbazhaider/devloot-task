import {ImageBackground, StyleSheet} from 'react-native';

import {IMAGES} from '../../utils/images';
import BatteryComponent from '../../components/BatteryComponent';
import DeviceIdComponent from '../../components/DeviceIdComponent';
import GyroscopeInfoComponent from '../../components/GyroscopeInfoComponent';

const MainScreen = () => {
  return (
    <ImageBackground
      style={styles.mainContainer}
      source={IMAGES.backgroundImage}>
      <BatteryComponent />
      <DeviceIdComponent />
      <GyroscopeInfoComponent />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
