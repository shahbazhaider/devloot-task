import {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';

const {DeviceIDModule} = NativeModules;

//Custom hook to get the Device Information from native modules in Android and iOS
const useDeviceID = () => {
  const [deviceID, setDeviceID] = useState(null);

  useEffect(() => {
    getDeviceID();
  }, []);

  const getDeviceID = async () => {
    const id = await new Promise((resolve, reject) => {
      //Calling Native module (both in Android and iOS) to get the device id.
      DeviceIDModule?.getDeviceID((err, id) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    });
    setDeviceID(id);
  };

  return {deviceID};
};

export default useDeviceID;
