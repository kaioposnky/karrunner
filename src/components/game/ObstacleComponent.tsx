import { Obstacle } from "@/types/Game";
import { ThemedView } from "../themed/ThemedView";
import { Image, StyleProp, ViewStyle } from "react-native";

export const ObstacleComponent = ({ obstacle, style, imageUrl }: { obstacle: Obstacle, style?: StyleProp<ViewStyle>, imageUrl?: string }) => {
  return (
    <ThemedView disableBg style={style} className="">
      <Image
        source={{ uri: imageUrl || "https://i.postimg.cc/zfnyVrCQ/hb20s.png"}}
        style={{ width: obstacle.width, height: obstacle.height, transform: [{ rotate: '180deg' }] }}
      />
    </ThemedView>
  )
};
