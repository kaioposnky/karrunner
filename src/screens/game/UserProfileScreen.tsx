import { GoBackButton } from "@/components/themed/GoBackButton";
import { ThemedButton } from "@/components/themed/ThemedButton";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { getUserCars } from "@/service/car";
import { getPlayerScore } from "@/service/score";
import { Car } from "@/types/Car";
import { useEffect, useState } from "react";
import { Image } from "react-native";

export const UserProfileScreen = () => {
  const { user, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [ userBalance, setUserBalance ] = useState(0);
  const [ userName, setUserName ] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [ carAmount, setCarAmount ] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    if(!isLoading && user !== null){
      setUserBalance(user.balance);
      setUserName(user.displayName);
      setUserEmail(user.email);
      getPlayerScore(user.uid).then((playerScore) => {
        setHighestScore(playerScore.score);
      });
      getUserCars(user.uid).then((cars) => {
        setCarAmount(cars.length);
      });
      setSelectedCar(user.selectedCar);
    }
  }, [isLoading, user]);

  if(isLoading && theme){
    return <ThemedView center="both" className="text-6xl"> Carregando...</ThemedView>
  }

  return (
    <ThemedView center="horizontal" className="flex-1">

      <ThemedView className={`mt-32 p-4 gap-y-8 rounded-lg bg-secondary-${theme}`}>

        {/* Nome do usuário com email */}
        <ThemedView className={`pb-4 mb-4 border-b rounded-lg p-4`}>
          <ThemedText className={`text-3xl font-bold`}>{userName}</ThemedText>
          <ThemedText className={`text-base`}>{userEmail}</ThemedText>
        </ThemedView>

        {/* Informações em baixo */}
        <ThemedView className={`gap-y-5 p-4 rounded-lg`}>

          {/* Linha Maior Pontuação */}
          <ThemedView className="flex-row justify-between items-center gap-x-5">
            <ThemedView className="flex-row items-center gap-x-3">
              <ThemedText className={`text-lg`}>Maior Pontuação</ThemedText>
            </ThemedView>

            <ThemedText className={`text-lg font-bold`}>{highestScore}</ThemedText>
          </ThemedView>

          {/* Linha Saldo */}
          <ThemedView className="flex-row justify-between items-center gap-x-5">
            <ThemedView className="flex-row items-center gap-x-3">
              <ThemedText className={`text-lg`}>Saldo</ThemedText>
            </ThemedView>
            <ThemedText className={`text-lg font-bold`}>${userBalance}</ThemedText>
          </ThemedView>

          {/* Linha Carros */}
          <ThemedView className="flex-row justify-between items-center gap-x-5">
            <ThemedView className="flex-row items-center gap-x-3">
              <ThemedText className={`text-lg`}>Carros na Garagem</ThemedText>
            </ThemedView>
            <ThemedText className={`text-lg font-bold`}>{carAmount}</ThemedText>
          </ThemedView>

          {/* Seção do Carro Selecionado */}
          {selectedCar && (
            <ThemedView className={`mt-6 pt-6 border-t`}>
              <ThemedText className={`text-sm font-semibold mb-3 tracking-wider`}>
                CARRO EM USO
              </ThemedText>
              <ThemedView className="flex-row items-center bg-black/20 p-3 rounded-lg">
                <Image
                  source={{ uri: selectedCar?.images.select }}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
                <ThemedText className={`ml-4 text-xl font-bold`}>{selectedCar.name}</ThemedText>
              </ThemedView>
            </ThemedView>
          )}

        </ThemedView>
      </ThemedView>
      <ThemedView disableBg className="mt-6 flex gap-y-4">
        <ThemedButton
          title={`Tema ${theme === "dark" ? "Escuro" : "Claro"}`}
          onPress={toggleTheme}
          className="p-3"
        />
        <GoBackButton className=""/>
      </ThemedView>
    </ThemedView>
  );
};
