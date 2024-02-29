package com.devloottask.deviceidmodule;

import android.content.Context;
import android.provider.Settings;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DeviceIdModule extends ReactContextBaseJavaModule {

    public DeviceIdModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceIDModule";
    }

    @ReactMethod
    public void getDeviceID(Callback callback) {
        Context context = getReactApplicationContext();
        String deviceID = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        callback.invoke(null, deviceID);
    }
}