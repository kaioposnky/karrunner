import { Modal, View, Text } from "react-native";
import { ThemedView } from "../themed/ThemedView";
import { ThemedText } from "../themed/ThemedText";
import { ThemedButton } from "../themed/ThemedButton";
import { useNavigation } from "@react-navigation/native";
import { GoBackButton } from "../themed/GoBackButton";

export const GameOverModal = ({
  score,
  highScore,
  onPlayAgain: onRestart,
  visible,
}: {
  score: number;
  highScore: number;
  onPlayAgain: () => void;
  visible: boolean;
}) => {

  const navigation = useNavigation();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className={'flex-1 items-center justify-center bg-black/50'}>
        <ThemedView className={'p-8 rounded-2xl gap-y-4 items-center'}>
          <ThemedText variant="title">Fim de jogo, você bateu!</ThemedText>
          <ThemedText className="text-2xl">Pontuação: <Text className="font-bold">{Math.ceil(score)}</Text></ThemedText>
          <ThemedText className="text-xl">Maior Pontuação: <Text className="font-bold">{Math.ceil(highScore)}</Text></ThemedText>
          <ThemedButton title="Jogar novamente" onPress={onRestart} />
          <GoBackButton/>
        </ThemedView>
      </View>
    </Modal>
  );
};
