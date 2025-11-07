import { KarRunnerGame } from '@/components/game/KarRunnerGame';
import { GoBackButton } from '@/components/themed/GoBackButton';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { getAllCars } from '@/service/car';
import { getPlayerScore, tryUpdateUserScore } from '@/service/score';
import { increaseUserBalance } from '@/service/user';
import { Car } from '@/types/Car';
import { User } from '@/types/User';
import { startAccelerometer, webSimulatedAccelerometer } from '@/utils/accelerometer';
import { AccelerometerMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const KarRunnerGameScreen = () => {
  const { user } = useAuth();
  const [accelerometerData, setAccelerometerData] = useState<AccelerometerMeasurement | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const [allCars, setAllCars] = useState<Car[] | null>(null);

  useEffect(() => {
    if (user !== null) {
      getPlayerScore(user.uid).then(
        userScore => setHighestScore(userScore.score)
      );
      setSelectedCar(user.selectedCar);
      if (Platform.OS === 'web') {
        webSimulatedAccelerometer(setAccelerometerData);
      }
      else {
        startAccelerometer(setAccelerometerData);
      }
      getAllCars().then(
        cars => setAllCars(cars)
      );
    }
  }, [user]);

  if (!accelerometerData || !selectedCar) {
    return <ThemedText>Carregando...</ThemedText>;
  }

  const handleGameOver = (score: number) => {
    const executeUpdate = async (user: User, score: number) => {
      await tryUpdateUserScore(user, score);
      await increaseUserBalance(user.uid, Math.ceil(score));
    }

    if (user !== null){
      executeUpdate(user, score);
    }
  };

  return (
    <ThemedView className="flex-1">
      <GoBackButton
        style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 2 }}
      />
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
        onGameEnd={handleGameOver}
        highScore={highestScore ?? 0}
        allCars={allCars}
        />
    </ThemedView>
  );
};
