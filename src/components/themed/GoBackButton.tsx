import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "./ThemedButton";

export const GoBackButton = ({ className }: { className?: string }) => {
  const navigation = useNavigation();

  return (
    <ThemedButton
      title="Voltar"
      className={`bg-red-500 ${className}`}
      onPress={() => navigation.goBack()}
    />
  );
};
