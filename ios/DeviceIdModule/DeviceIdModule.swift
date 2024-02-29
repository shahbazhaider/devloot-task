//
//  DeviceIdModule.swift
//  DevlootTask
//
//  Created by Malik Shahbaz Haider on 28/02/2024.
//

import Foundation
import UIKit
import React

@objc(DeviceIDModule)
class DeviceIDModule: NSObject {
  
  @objc
  func getDeviceID(_ callback: RCTResponseSenderBlock) {
    if let uuid = UIDevice.current.identifierForVendor?.uuidString {
      callback([NSNull(), uuid])
    } else {
      let error = "Unable to retrieve device ID"
      callback([error, NSNull()])
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

