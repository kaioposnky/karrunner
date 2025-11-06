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
import { useAuth } from '@/hooks/useAuth';
import { useCarSpin } from '@/hooks/useCarSpin';

export const CarSpinScreen = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const { user, isLoading } = useAuth();
  const {
    shouldSpin,
    selectedCar,
    isSpinning,
    handleSpinStart,
    handleSpinEnd,
    handleRedeem,
    spinReel,
    SPIN_COST,
    balance,
  } = useCarSpin(user, isLoading);

  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getAllCars();
      setAllCars(cars);
    };

    fetchCars();
  }, []);
  const { theme } = useTheme();

  const navigation = useNavigation<GameNavigationProps>();

  const goBack = () => {
    navigation.goBack();
  };

  const themeBg = theme === 'dark' ? 'bg-secondary-dark' : 'bg-secondary-light';
  const borderBg = theme === 'dark' ? 'border-secondary-dark' : 'border-secondary-light';
  const REEL_CONTAINER_HEIGHT = 15 * 24; // Tamanho do container da roleta
  const ITEM_SIZE = 120; // Não mexer, se não buga o layout

  return (
    <ThemedView center="horizontal" className="gap-6 p-4">
      <ThemedText className="mt-20 text-5xl font-bold">🎰 Roletar Carros</ThemedText>
      <ThemedText variant='title'>Você possui ${balance} em sua conta</ThemedText>

      {/* Área da roleta */}
      <ThemedView
        className={`items-center overflow-hidden rounded-lg p-2 ${themeBg}`}
        style={{ height: REEL_CONTAINER_HEIGHT }}>
        {allCars.length > 0 && (
          <CarSpinReel
            cars={allCars}
            shouldSpin={shouldSpin}
            onSpin={handleSpinStart}
            onSpinComplete={handleSpinEnd}
            itemSize={ITEM_SIZE}
            containerHeight={REEL_CONTAINER_HEIGHT}
            offset={0}
          />
        )}
        {/*Seta no meio da roleta*/}
        <ThemedView
          disableBg
          className='absolute top-0 bottom-0 left-0 justify-center'
        >
          <ThemedText className='text-3xl text-yellow-400'>▶</ThemedText>
        </ThemedView>
        {/*Seta no meio da roleta*/}
        <ThemedView
          disableBg
          className='absolute top-0 bottom-0 right-0 justify-center'
        >
          <ThemedText className='text-3xl text-yellow-400'>◀</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Botão de girar */}
      <ThemedButton
        title={isSpinning ? 'Girando...' : `Roletar carro! $${SPIN_COST}`}
        className={'text-bold bg-yellow-600'}
        onPress={spinReel}
        disabled={isSpinning || shouldSpin}
        size="large"
      />

      {/* Botão de voltar */}
      <ThemedButton
        title={isSpinning ? 'Girando...' : 'Voltar'}
        className='bg-red-500'
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
