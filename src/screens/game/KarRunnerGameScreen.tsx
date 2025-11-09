import { KarRunnerGame } from '@/components/game/KarRunnerGame';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { getAllCars } from '@/service/car';
import { getPlayerScore, tryUpdateUserScore } from '@/service/score';
import { increaseUserBalance } from '@/service/user';
import { Car } from '@/types/Car';
import { User } from '@/types/User';
import { startAccelerometer, webSimulatedAccelerometer } from '@/utils/accelerometer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AccelerometerMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

export const KarRunnerGameScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!accelerometerData || !selectedCar) {
    return (
      <ThemedView center="both">
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
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
      <TouchableOpacity
        onPress={handleGoBack}
        className="absolute w-20 h-20  bg-red-600 justify-center items-center"
        style={{ zIndex: 10, backgroundColor: '#DC2626', top: 48, right: 16, borderRadius: 20 }}
      >
        <MaterialCommunityIcons name="home" size={40} color="white" />
      </TouchableOpacity>

      {/* O Jogo em si, que ocupa a tela toda */}
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
