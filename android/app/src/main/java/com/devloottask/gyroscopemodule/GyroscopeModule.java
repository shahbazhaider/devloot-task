package com.devloottask.gyroscopemodule;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class GyroscopeModule extends ReactContextBaseJavaModule implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor gyroscopeSensor;

    public GyroscopeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        sensorManager = (SensorManager) reactContext.getSystemService(ReactApplicationContext.SENSOR_SERVICE);
        gyroscopeSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
    }

    @Override
    public String getName() {
        return "GyroscopeModule";
    }

    @ReactMethod
    public void getGyroscopeData(final Callback callback) {
        if (gyroscopeSensor != null) {
            sensorManager.registerListener(this, gyroscopeSensor, SensorManager.SENSOR_DELAY_NORMAL);
        } else {
            callback.invoke("Gyroscope not available", null);
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        sensorManager.unregisterListener(this); // Unregister listener after receiving data

        float[] rotationRate = event.values;

        double rotationRateX = rotationRate[0];
        double rotationRateY = rotationRate[1];
        double rotationRateZ = rotationRate[2];
        String orientation = calculateOrientation(rotationRateX, rotationRateY);

        WritableMap data = Arguments.createMap();
        data.putDouble("rotationRateX", rotationRateX);
        data.putDouble("rotationRateY", rotationRateY);
        data.putDouble("rotationRateZ", rotationRateZ);
        data.putString("orientation", orientation);

        sendEvent("GyroscopeData", data);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Not needed for gyroscope
    }

    private String calculateOrientation(double rotationRateX, double rotationRateY) {
        double angle = Math.atan2(rotationRateY, rotationRateX);
        double degrees = Math.toDegrees(angle);
        if (degrees >= -45 && degrees <= 45) {
            return "Landscape"; // Landscape
        } else {
            return "Portrait"; // Portrait
        }
    }

    private void sendEvent(String eventName, WritableMap params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
