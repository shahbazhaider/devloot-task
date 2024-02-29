import {useEffect, useState} from 'react';
import {DeviceEventEmitter, NativeModules, Platform} from 'react-native';

const {GyroscopeModule} = NativeModules;

const useGyroscope = () => {
  const [gyroscopeData, setGyroscopeData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription = null;

    const fetchData = async () => {
      if (Platform.OS === 'android') {
        fetchDataAndroid();
      } else if (Platform.OS === 'ios') {
        fetchDataIOS();
      }
    };

    const fetchDataAndroid = () => {
      subscription = DeviceEventEmitter.addListener('GyroscopeData', data => {
        setGyroscopeData(data);
        setIsLoading(false);
      });

      GyroscopeModule.getGyroscopeData((err, result) => {
        if (err) {
          setError(err);
          setIsLoading(false);
        }
      });
    };

    const fetchDataIOS = async () => {
      try {
        const data = await new Promise((resolve, reject) => {
          GyroscopeModule.getGyroscopeData((err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        setGyroscopeData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return {gyroscopeData, error, isLoading};
};

export default useGyroscope;
