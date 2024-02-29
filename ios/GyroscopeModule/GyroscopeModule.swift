//
//  GyroscopeModule.swift
//  DevlootTask
//
//  Created by Malik Shahbaz Haider on 28/02/2024.
//

import Foundation
import CoreMotion

@objc(GyroscopeModule)
class GyroscopeModule: NSObject {
    
    private let motionManager = CMMotionManager()
    
    @objc
    func getGyroscopeData(_ callback: @escaping RCTResponseSenderBlock) {
        guard motionManager.isGyroAvailable else {
            callback(["Gyroscope is not available on this device.", NSNull()])
            return
        }
        
        motionManager.startGyroUpdates(to: OperationQueue.main) { (gyroData, error) in
            guard let gyroData = gyroData, error == nil else {
                callback(["Failed to retrieve gyroscope data.", NSNull()])
                return
            }
            
            let rotationRateX = gyroData.rotationRate.x
            let rotationRateY = gyroData.rotationRate.y
            let rotationRateZ = gyroData.rotationRate.z
            let orientation = self.calculateOrientation(x: rotationRateX, y: rotationRateY)
                      
          
            let data = [
                "rotationRateX": rotationRateX,
                "rotationRateY": rotationRateY,
                "rotationRateZ": rotationRateZ,
                "orientation" : orientation
            ]
            
            callback([NSNull(), data])
        }
    }
  
  func calculateOrientation(x: Double, y: Double) -> String {
          let angle = atan2(y, x)
          let degrees = angle * (180.0 / Double.pi)
          if degrees >= -45 && degrees <= 45 {
              return "landscape"
          } else {
              return "portrait"
          }
      }
}
