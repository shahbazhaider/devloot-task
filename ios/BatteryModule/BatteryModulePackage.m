//
//  BatteryModule.m
//  DevlootTask
//
//  Created by Malik Shahbaz Haider on 27/02/2024.
//

// BatteryModule.m

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BatteryModule, NSObject)

RCT_EXTERN_METHOD(getBatteryInfo:(RCTResponseSenderBlock)callback)

@end
