import { ThemedText } from '../themed/ThemedText';
import { ThemedView } from '../themed/ThemedView';

export const Header = () => {
  return (
    <ThemedView>
      <ThemedText variant="title" className="text-6xl">
        KarRunner
      </ThemedText>
    </ThemedView>
  );
};
