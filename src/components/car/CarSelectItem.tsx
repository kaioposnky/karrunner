import { Car } from '@/types/Car';
import { ThemedView } from '../themed/ThemedView';
import {Image} from 'react-native';
import { ThemedText } from "../themed/ThemedText";

interface CarSelectItemProps{
  car: Car;
  unlocked: boolean;
  selected: boolean;
}

export const CarSelectItem = ({ car, unlocked, selected }: CarSelectItemProps) => {
  const capitalize = (s: string) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || ""

  return (
    <ThemedView
      className={`p-2`}
      center="horizontal"
    >
      <Image
        src={car.images.select}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
        resizeMode="contain"
        accessibilityLabel={`${car.name}`}
      />
      <ThemedText
        className="text-center"
        numberOfLines={1}
      >
        {capitalize(car.name)}
      </ThemedText>
      <ThemedText
        className={`text-rarity-${car.rarity} text-center`}
      >
        {capitalize(car.rarity)}
      </ThemedText>
    </ThemedView>
  )
};
