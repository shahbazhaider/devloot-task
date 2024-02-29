import {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';

const {BatteryModule} = NativeModules;

//Custom hook to get the battery information from native modules in Android and iOS
const useBatteryInfo = () => {
  const [batteryInfo, setBatteryInfo] = useState({});

  useEffect(() => {
    setBatterInfo();
  }, []);

  const setBatterInfo = async () => {
    const batteryData = await getBatteryInfo();
    setBatteryInfo(batteryData);
  };

  const getBatteryInfo = () => {
    return new Promise((resolve, reject) => {
      //Calling Native module (both in Android and iOS) to get the battery information id.
      BatteryModule?.getBatteryInfo((error, batteryInfo) => {
        if (error) {
          reject(error);
        } else {
          resolve(batteryInfo);
        }
      });
    });
  };

  return {
    batteryInfo,
  };
};

export default useBatteryInfo;
