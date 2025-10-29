import { FlatList } from "react-native";
import { ThemedView } from "../themed/ThemedView";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Car } from "@/types/Car";
import { ThemedText } from '@/components/themed/ThemedText';

interface ReelProps {
  cars: Car[];
  onSpin: () => void;
  shouldSpin: boolean;
  onSpinComplete: (selectedCar: Car) => void;
}

export const Reel = ({ cars, shouldSpin, onSpin, onSpinComplete }: ReelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [extendedCars, setExtendedCars] = useState<Car[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // TODO: Colocar para raridades maiores virem com menos frequência
  const multiplyCars = useCallback(() => {
    const multipliedCars = [];
    for (let i = 0; i < 10; i++) {
      multipliedCars.push(...cars);
    }
    setExtendedCars(multipliedCars);
  }, [cars]);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    onSpin();

    const randomCar = Math.floor(Math.random() * cars.length);
    const selectedCarSpinningIndex = cars.length * 5 + randomCar;

    flatListRef.current?.scrollToIndex({
      index: selectedCarSpinningIndex,
      animated: true,
      viewPosition: 0.5,
    });

    setTimeout(() => {
      setIsSpinning(false);
      const selectedCarFinal = cars[randomCar];
      setSelectedCar(selectedCarFinal);

      onSpinComplete(selectedCarFinal);
    }, 5000);
  }, [cars, isSpinning, onSpin, onSpinComplete]);

  const renderCarItem = ({ item, index }: { item: Car; index: number }) => (
    <ThemedView
      style={{
        width: 100,
        height: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: selectedCar?.id === item.id ? '#FFD700' : '#ccc',
      }}>
      <ThemedText
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center',
          color: getRarityColor(item.rarity),
        }}>
        {item.name}
      </ThemedText>
      <ThemedText style={{ fontSize: 10, marginTop: 4 }}>{item.rarity}</ThemedText>
    </ThemedView>
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return '#808080';
      case 'rare':
        return '#0080FF';
      case 'epic':
        return '#8A2BE2';
      case 'legendary':
        return '#FFD700';
      default:
        return '#000000';
    }
  };

  useEffect(() => {
    if (shouldSpin && !isSpinning) {
      spin();
    }
  }, [isSpinning, shouldSpin, spin]);

  useEffect(() => {
    multiplyCars();
  }, [cars, multiplyCars]);

  return (
    <FlatList
      ref={flatListRef}
      data={extendedCars || []}
      renderItem={renderCarItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      scrollEnabled={!isSpinning}
      getItemLayout={(data, index) => ({
        length: 120,
        offset: 120 * index,
        index,
      })}
    />
  );
};

