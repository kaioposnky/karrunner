import { Animated, Dimensions, Easing } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Car } from '@/types/Car';
import { Rarity, RarityProbability } from '@/types/Rarity';
import { ThemedView } from '../themed/ThemedView';
import { ThemedText } from '../themed/ThemedText';

interface ReelProps {
  cars: Car[];
  onSpin: () => void;
  shouldSpin: boolean;
  onSpinComplete: (car: Car) => void;
  itemSize: number;
  offset?: number;
  containerHeight: number;
}

interface ReelCar extends Car {
  index?: number;
}

export const CarSpinReel = ({
  cars: availableCars,
  shouldSpin,
  onSpin,
  onSpinComplete,
  itemSize,
  containerHeight,
  offset = 0,
}: ReelProps) => {
  // Consts
  const carListSize = 50;
  const middlePositionStart = carListSize * 2;

  // States
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ReelCar | null>(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState<number | null>(null);
  const [cars, setCars] = useState<ReelCar[]>([]);
  const [carsExtended, setCarsExtended] = useState<ReelCar[]>([]);

  // Refs
  const spinAnimation = useRef(new Animated.Value(middlePositionStart)).current;
  const animationPos = useRef(middlePositionStart);

  const spin = useCallback(() => {
    if (isSpinning) return;
    if (cars.length === 0 || carsExtended.length === 0) return;
    setIsSpinning(true);
    setSelectedCar(null);
    onSpin();

    const currentPosition = animationPos.current; // Posição atual na animação (provavelmente so vai considerar a posicao final anterior)
    const rotatedElements = cars.length; // Equivale a 1 rotação completa o tamanho da lista de carros
    const randomPosition = Math.floor(Math.random() * cars.length); // Posição aleatória entre 0 e o tamanho da lista de carros
    const finalTargetedPosition = middlePositionStart + randomPosition; // Índice exato em (carsExtended) que corresponde ao carro sorteado

    // Essa parte faz um "salto virtual" que gera o efeito de roletar carro
    let finalPosition = finalTargetedPosition; // Destino final da animação (bate com o índice do carro sorteado)

    // Joga a posição final virtual para sempre, porque a posição aleatória fornecida pode ser 100,
    // Como a posição anterior pode ser > 100, iria parecer que está indo para trás, portanto, giramos
    // a posição atual, não tem problema girar no tamanho da lista porque o carro sorteado é o mesmo
    while (finalPosition <= currentPosition) {
      finalPosition += carListSize;
    }

    // Mais uma rotação segura
    finalPosition += rotatedElements;

    Animated.timing(spinAnimation, {
      toValue: finalPosition,
      useNativeDriver: true,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      // Tudo aqui será chamado depois de finalizada a animação
      const carResult = cars[randomPosition];

      setTimeout(() => {
        setIsSpinning(false);
        setSelectedCar(carResult);
        setSelectedCarIndex(finalTargetedPosition);
        onSpinComplete(carResult);
      }, 100);

      spinAnimation.setValue(finalTargetedPosition);

      // Lógica para mostrar o carro selecionado
    });
  }, [
    cars,
    carsExtended.length,
    isSpinning,
    middlePositionStart,
    onSpin,
    onSpinComplete,
    spinAnimation,
  ]);

  const renderCarItem = ({ car, index }: { car: ReelCar; index: number }) => (
    <ThemedView
      style={{
        width: itemSize,
        height: itemSize,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: selectedCarIndex === index ? '#FFD700' : '#ccc',
      }}>
      <ThemedText
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center',
          color: getRarityColor(car.rarity),
        }}>
        {car.name}
      </ThemedText>
      <ThemedText style={{ fontSize: 10, marginTop: 4 }}>{car.rarity}</ThemedText>
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

  const itemHeight = itemSize + 20;

  const middleOffset = containerHeight / 2 - itemHeight / 2 + offset;

  const interpolationY = spinAnimation.interpolate({
    inputRange: [0, Math.max(carsExtended.length - 1, 1)],
    outputRange: [middleOffset, middleOffset - itemHeight * Math.max(carsExtended.length - 1, 1)],
  });

  const getRandomRarity = () => {
    const rarities = Object.keys(RarityProbability) as Rarity[];
    const random = Math.random();
    let threshold = 0;
    for (let i = 0; i < rarities.length; i++) {
      threshold += RarityProbability[rarities[i]];
      if (threshold > random) {
        return rarities[i];
      }
    }

    return rarities[rarities.length - 1];
  };

  const fillCarsWeightedRarity = useCallback((cars: Car[]) => {
    const rarity = getRandomRarity();

    const sameRarityCars = cars.filter((car) => car.rarity === rarity);

    if (sameRarityCars.length === 0) return cars[Math.floor(Math.random() * cars.length)];

    const randomCar = sameRarityCars[Math.floor(Math.random() * sameRarityCars.length)];

    return randomCar;
  }, []);

  useEffect(() => {
    let newCarsList: ReelCar[] = [];
    for (let i = 0; i < carListSize; i++) {
      newCarsList[i] = fillCarsWeightedRarity(availableCars);
      newCarsList[i].index = i;
    }
    setCars(newCarsList);
    setCarsExtended(
      newCarsList.concat(newCarsList, newCarsList, newCarsList, newCarsList, newCarsList)
    );
  }, [availableCars, fillCarsWeightedRarity]);

  useEffect(() => {
    // Listener para atualizar o valor da posição da animação
    spinAnimation.addListener((v) => {
      animationPos.current = v.value;
    });

    // Quando o componente for deletado remover o listener
    return () => {
      spinAnimation.removeAllListeners();
    };
  }, [spinAnimation]);

  useEffect(() => {
    if (shouldSpin && !isSpinning) {
      spin();
    }
  }, [isSpinning, shouldSpin, spin]);

  return (
    // Roleta de carros
    <Animated.View style={{ flexDirection: 'column', transform: [{ translateY: interpolationY }] }}>
      {carsExtended.map((car, index) => (
        <ThemedView key={`${car.id}-${index}`} disableBg={true}>
          {renderCarItem({ car, index })}
        </ThemedView>
      ))}
    </Animated.View>
  );
};
