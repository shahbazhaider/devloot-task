package com.devloottask.batterymodule;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class BatteryModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private BroadcastReceiver batteryReceiver;

    public BatteryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "BatteryModule";
    }

    @ReactMethod
    public void getBatteryInfo(final Callback callback) {
        batteryReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
                    int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
                    boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING;
                    boolean isFull = status == BatteryManager.BATTERY_STATUS_FULL;
                    String batteryStatus;

                    if (isCharging) {
                        batteryStatus = "Charging";
                    } else if (isFull) {
                        batteryStatus = "Full";
                    } else {
                        batteryStatus = "Not Charging";
                    }

                    int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
                    int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
                    float batteryLevel = level / (float) scale;

                    // Create a WritableMap to hold battery information
                    WritableMap batteryInfo = Arguments.createMap();
                    batteryInfo.putString("status", batteryStatus);
                    batteryInfo.putDouble("level", batteryLevel * 100); // Convert to percentage

                    // Invoke the callback with battery information
                    callback.invoke(null, batteryInfo);

                    // Unregister the receiver after receiving the battery information
                    reactContext.unregisterReceiver(batteryReceiver);
                }
            }
        };
        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        reactContext.registerReceiver(batteryReceiver, filter);
    }
}
