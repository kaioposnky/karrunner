import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";

export const Header = () => {
  return (
    <ThemedView 
      center="horizontal"
      className={"pt-52 flex gap-y-20"}
    >
      <ThemedText
        variant="title"
        className="text-6xl"
      >
        KarRunner
      </ThemedText>
    </ThemedView>
  );
};
