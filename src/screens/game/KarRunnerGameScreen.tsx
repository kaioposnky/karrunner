import { KarRunnerGame } from '@/components/game/KarRunnerGame';
import { ThemedButton } from '@/components/themed/ThemedButton';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { Car } from '@/types/Car';
import { startAccelerometer } from '@/utils/accelerometer';
import { useNavigation } from '@react-navigation/native';
import { AccelerometerMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';

export const KarRunnerGameScreen = () => {
  const { user } = useAuth();
  const [accelerometerData, setAccelerometerData] = useState<AccelerometerMeasurement | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (user !== null) {
      setSelectedCar(user.selectedCar);
      startAccelerometer(setAccelerometerData);
    }
  }, [user]);

  if (!accelerometerData || !selectedCar) {
    return <ThemedText>Carregando...</ThemedText>;
  }

  return (
    <ThemedView className="flex-1">
      {/*<ThemedText>KarRunner Game Screen</ThemedText>*/}
      <ThemedView
        center='both'
        disableBg={true}
        style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 1 }}
      >
        <ThemedText>X: {accelerometerData.x.toFixed(2)}</ThemedText>
        <ThemedText>Y: {accelerometerData.y.toFixed(2)}</ThemedText>
        <ThemedText>Z: {accelerometerData.z.toFixed(2)}</ThemedText>
      </ThemedView>
      <KarRunnerGame
        accelerometerData={accelerometerData}
        selectedCar={selectedCar}
        onGameEnd={(score: number) => console.log("Game Over, your score is ", score)}
      />
      <ThemedButton
        title='Voltar'
        className={'mb-10'}
        onPress={() => navigation.goBack()}
      />
    </ThemedView>
  );
};
