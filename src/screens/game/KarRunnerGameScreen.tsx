import { KarRunnerGame } from '@/components/game/KarRunnerGame';
import { ThemedButton } from '@/components/themed/ThemedButton';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { getPlayerScore, tryUpdateUserScore } from '@/service/score';
import { increaseUserBalance } from '@/service/user';
import { Car } from '@/types/Car';
import { User } from '@/types/User';
import { startAccelerometer } from '@/utils/accelerometer';
import { useNavigation } from '@react-navigation/native';
import { AccelerometerMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';

export const KarRunnerGameScreen = () => {
  const { user } = useAuth();
  const [accelerometerData, setAccelerometerData] = useState<AccelerometerMeasurement | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (user !== null) {
      getPlayerScore(user.uid).then(
        userScore => setHighestScore(userScore.score)
      );
      setSelectedCar(user.selectedCar);
      startAccelerometer(setAccelerometerData);
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
        onGameEnd={handleGameOver}
        highScore={highestScore ?? 0}
        />
      <ThemedButton
        title='Voltar'
        className={'mb-10'}
        onPress={() => navigation.goBack()}
      />
    </ThemedView>
  );
};
