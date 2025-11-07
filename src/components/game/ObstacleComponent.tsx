import { ThemedView } from "../themed/ThemedView";
import { Image, StyleProp, ViewStyle } from "react-native";
import { Obstacle } from "@/hooks/useGameEngine";

export const ObstacleComponent = ({ obstacle, style, imageUrl }: { obstacle: Obstacle, style?: StyleProp<ViewStyle>, imageUrl?: string }) => {
  return (
    <ThemedView disableBg style={style} className="border-t-stone-600 border-4">
      <Image
        source={{ uri: imageUrl || "https://i.postimg.cc/zfnyVrCQ/hb20s.png"}}
        style={{ width: 60, height: 60, transform: [{ rotate: '180deg' }] }}
      />
    </ThemedView>
  )
};
