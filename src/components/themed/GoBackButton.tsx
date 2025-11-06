import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "./ThemedButton";

export const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <ThemedButton
      title="Voltar"
      className="bg-red-500"
      onPress={() => navigation.goBack()}
    />
  );
};
