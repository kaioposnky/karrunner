import { PlayerCar } from "@/types/Game";
import { ThemedView } from "../themed/ThemedView";
import { Image, StyleProp, ViewStyle } from "react-native";

export const PlayerCarComponent = ({ car, style }: { car: PlayerCar, style?: StyleProp<ViewStyle> }) => {
  return (
    <ThemedView disableBg style={style} className="">
      <Image
        source={{ uri: car.carInfo.images.run }}
        style={{ width: car.width, height: car.height }}
      />
    </ThemedView>
  )
};
