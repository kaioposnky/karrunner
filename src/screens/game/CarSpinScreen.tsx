import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Car } from '@/types/Car';
import React, { useEffect, useState } from 'react';
import { ThemedButton } from '@/components/themed/ThemedButton';
import { CarSpinReel } from '@/components/reel/CarSpinReel';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { GameNavigationProps } from '@/types/GameNavigationList';
import { Modal } from 'react-native';
import { getAllCars } from '@/service/car';

export const CarSpinScreen = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [shouldSpin, setShouldSpin] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getAllCars();
      setAllCars(cars);
    };

    fetchCars();
  }, []);

  const navigation = useNavigation<GameNavigationProps>();
  const { theme } = useTheme();

  const handleSpinStart = () => {
    setIsSpinning(true);
    setSelectedCar(null);
  };

  const handleSpinComplete = (car: Car) => {
    setSelectedCar(car);
    setShouldSpin(false);
    setIsSpinning(false);
  };

  const handleRedeem = () => {
    setSelectedCar(null);
  };

  const startSpin = () => {
    if (!shouldSpin) {
      setIsSpinning(true);
      setShouldSpin(true);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const themeBg = theme === 'dark' ? 'bg-secondary-dark' : 'bg-secondary-light';
  const borderBg = theme === 'dark' ? 'border-secondary-dark' : 'border-secondary-light';
  const REEL_CONTAINER_HEIGHT = 20 * 24;
  const ITEM_SIZE = 120;

  return (
    <ThemedView center="horizontal" className="gap-6 p-4">
      <ThemedText className="mt-20 text-5xl font-bold">🎰 Roletar Carros</ThemedText>

      {/* Área da roleta */}
      <ThemedView
        className={`items-center overflow-hidden rounded-lg p-2 ${themeBg}`}
        style={{ height: REEL_CONTAINER_HEIGHT }}>
        {allCars.length > 0 && (
          <CarSpinReel
            cars={allCars}
            shouldSpin={shouldSpin}
            onSpin={handleSpinStart}
            onSpinComplete={handleSpinComplete}
            itemSize={ITEM_SIZE}
            containerHeight={REEL_CONTAINER_HEIGHT}
            offset={0}
          />
        )}
      </ThemedView>

      {/* Botão de girar */}
      <ThemedButton
        title={isSpinning ? 'Girando...' : 'Roletar carro! $1000'}
        className={'text-bold bg-yellow-600'}
        onPress={startSpin}
        disabled={isSpinning || shouldSpin}
        size="large"
      />

      {/* Botão de voltar */}
      <ThemedButton
        title={isSpinning ? 'Girando...' : 'Voltar'}
        onPress={goBack}
        disabled={isSpinning || shouldSpin}
        size="large"
      />

      {/* Resultado */}
      {selectedCar && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={selectedCar !== null}
          onRequestClose={handleRedeem}>
          <ThemedView className={`flex-1 items-center justify-center bg-black/50 `}>
            <ThemedView className={`w-4/5 max-w-sm items-center gap-4 rounded-lg p-6 ${borderBg}`}>
              <ThemedText className="text-2xl font-bold">🏆 Você ganhou:</ThemedText>
              <ThemedText className="text-xl">{selectedCar.name}</ThemedText>
              <ThemedText className="text-base opacity-80">
                Raridade: {selectedCar.rarity}
              </ThemedText>
              <ThemedButton title="Resgatar" onPress={handleRedeem} size="large" />
            </ThemedView>
          </ThemedView>
        </Modal>
      )}
    </ThemedView>
  );
};
