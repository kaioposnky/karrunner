import { Car } from '@/types/Car';
import { ThemedView } from '../themed/ThemedView';
import { Image } from 'react-native';
import { ThemedText } from "../themed/ThemedText";

interface CarSelectItemProps{
  car: Car;
  unlocked: boolean;
  selected: boolean;
}

export const CarSelectItem = ({ car }: CarSelectItemProps) => {
  const capitalize = (s: string) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || ""

  return (
    <ThemedView
      className={`p-2 items-center`}
    >
      <ThemedView style={{ width: '100%', aspectRatio: 1 }}>
        <Image
          source={{ uri: car.images.select }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
          accessibilityLabel={`${car.name}`}
        />
      </ThemedView>

      <ThemedText
        className="text-center mt-1"
        numberOfLines={1}
      >
        {capitalize(car.name)}
      </ThemedText>
      <ThemedText
        className={`text-rarity-${car.rarity} text-center text-xs`}
      >
        {capitalize(car.rarity)}
      </ThemedText>
    </ThemedView>
  )
};
