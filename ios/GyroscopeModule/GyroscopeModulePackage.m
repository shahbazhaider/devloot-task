//
//  GyroscopeModulePackage.m
//  DevlootTask
//
//  Created by Malik Shahbaz Haider on 28/02/2024.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(GyroscopeModule, NSObject)

RCT_EXTERN_METHOD(getGyroscopeData: (RCTResponseSenderBlock)callback)

@end
