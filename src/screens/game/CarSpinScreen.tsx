import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Car } from '@/types/Car';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button, View } from 'react-native';
import { Reel } from '@/components/reel/CarReel'
const testCars: Car[] = [
  { id: '1', name: 'Honda Civic', rarity: 'common' },
  { id: '2', name: 'Toyota Corolla', rarity: 'common' },
  { id: '3', name: 'BMW M3', rarity: 'rare' },
  { id: '4', name: 'Mercedes AMG', rarity: 'rare' },
  { id: '5', name: 'Ferrari F40', rarity: 'epic' },
  { id: '6', name: 'Lamborghini', rarity: 'epic' },
  { id: '7', name: 'Bugatti Veyron', rarity: 'legendary' },
  { id: '8', name: 'McLaren P1', rarity: 'legendary' },
];

export const CarRouletteScreen = () => {
  const navigation = useNavigation();
  const [shouldSpin, setShouldSpin] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinStart = () => {
    console.log('🎰 Roleta começou a girar!');
    setIsSpinning(true);
    setSelectedCar(null); // Limpar seleção anterior
  };

  const handleSpinComplete = (car: Car) => {
    console.log('🏆 Carro selecionado:', car.name, `(${car.rarity})`);
    setSelectedCar(car);
    setShouldSpin(false); // Reset
    setIsSpinning(false);
  };

  const startSpin = () => {
    if (!shouldSpin) {
      setShouldSpin(true);
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
        🎰 Car Roulette
      </ThemedText>

      {/* Área da roleta */}
      <View style={{ height: 150, marginVertical: 20 }}>
        <Reel
          cars={testCars}
          shouldSpin={shouldSpin}
          onSpin={handleSpinStart}
          onSpinComplete={handleSpinComplete}
        />
      </View>

      {/* Botão de girar */}
      <View style={{ marginVertical: 20 }}>
        <Button
          title={isSpinning ? 'Girando...' : '🎲 Girar Roleta!'}
          onPress={startSpin}
          disabled={isSpinning}
        />
      </View>

      {/* Resultado */}
      {selectedCar && (
        <ThemedView
          style={{
            padding: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFD700',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>🏆 Você ganhou:</ThemedText>
          <ThemedText style={{ fontSize: 16, marginTop: 10 }}>{selectedCar.name}</ThemedText>
          <ThemedText style={{ fontSize: 14, marginTop: 5, opacity: 0.8 }}>
            Raridade: {selectedCar.rarity}
          </ThemedText>
        </ThemedView>
      )}

      {/* Info de debug */}
      <View style={{ marginTop: 20, opacity: 0.6 }}>
        <ThemedText style={{ fontSize: 12, textAlign: 'center' }}>
          Debug: shouldSpin={shouldSpin.toString()}, isSpinning={isSpinning.toString()}
        </ThemedText>
      </View>
    </ThemedView>
  );
};
