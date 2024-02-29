//
//  DeviceIdModulePackage.m
//  DevlootTask
//
//  Created by Malik Shahbaz Haider on 28/02/2024.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DeviceIDModule, NSObject)

RCT_EXTERN_METHOD(getDeviceID: (RCTResponseSenderBlock)callback)

@end
