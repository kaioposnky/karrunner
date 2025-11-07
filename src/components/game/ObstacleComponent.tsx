import { ThemedView } from "../themed/ThemedView";
import { Image, StyleProp, ViewStyle } from "react-native";
import { Obstacle } from "@/hooks/useGameEngine";

export const ObstacleComponent = ({ obstacle, style }: { obstacle: Obstacle, style?: StyleProp<ViewStyle> }) => {
  return (
    <ThemedView disableBg style={style} className="border-t-stone-600 border-4">
      <Image
        source={{ uri: "https://i.postimg.cc/zfnyVrCQ/hb20s.png"}}
        style={{ width: obstacle.width, height: obstacle.height }}
      />
    </ThemedView>
  )
};
