import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';

export const startAccelerometer = (listener: (data: AccelerometerMeasurement) => void) => {
  Accelerometer.setUpdateInterval(100);
  Accelerometer.addListener(listener);
};
