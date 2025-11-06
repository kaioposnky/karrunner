import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "./ThemedButton";

export const GoBackButton = ({ className, style }: { className?: string, style?: any }) => {
  const navigation = useNavigation();

  return (
    <ThemedButton
      title="Voltar"
      className={`bg-red-500 ${className}`}
      style={style}
      onPress={() => navigation.goBack()}
    />
  );
};
