//
//  BatteryModule.swift
//  DevlootTask
//
//  Created by Malik Shahbaz Haider on 27/02/2024.
//

// BatteryInfo.swift

import Foundation
import UIKit
import React

@objc(BatteryModule)
class BatteryModule: NSObject {
    
  @objc
   static func requiresMainQueueSetup() -> Bool {
     return true
   }
   
    
    @objc
    func getBatteryInfo(_ callback: RCTResponseSenderBlock) {
        let device = UIDevice.current
        device.isBatteryMonitoringEnabled = true
        
        var batteryStatus: String
        switch device.batteryState {
        case .charging:
            batteryStatus = "Charging"
        case .full:
            batteryStatus = "Full"
        case .unplugged:
            batteryStatus = "Not Charging"
        default:
            batteryStatus = "Unknown"
        }
        
        let batteryLevel = Int(device.batteryLevel * 100)
        
        callback([NSNull(), ["status": batteryStatus, "level": batteryLevel]])
    }
}

