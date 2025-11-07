import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';

export const startAccelerometer = (listener: (data: AccelerometerMeasurement) => void) => {
  Accelerometer.setUpdateInterval(100);
  Accelerometer.addListener(listener);
};

export const webSimulatedAccelerometer = (listener: (data: AccelerometerMeasurement) => void) => {
  const interval = setInterval(() => {
    listener({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1, timestamp: Date.now() });
  }, 100);
  return () => clearInterval(interval);
};
