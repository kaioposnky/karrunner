import { Header } from "@/components/header/Header";
import { ThemedButton } from "@/components/themed/ThemedButton";
import { ThemedView } from "@/components/themed/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { GameNavigationProps } from "@/types/GameNavigationList";
import { RootNavigationList } from "@/types/RootNavigationList";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const GameMainMenu = () => {
  const { logout } = useAuth();

  const gameNav = useNavigation<GameNavigationProps>();
  const rootNav = useNavigation<StackNavigationProp<RootNavigationList>>();

  const goToAuth = () => {
    logout();
    rootNav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthNavigation' }],
      })
    );
  }

  const goToKarRunner = () => {
    gameNav.navigate("KarRunnerGameScreen");
  }

  const goToCarSpin = () => {
    gameNav.navigate("CarSpinScreen");
  };

  const goToUserProfile = () => {
    gameNav.navigate("UserProfileScreen");
  };

  const goToCarSelection = () => {
    gameNav.navigate("CarSelectionScreen");
  };

  const goToLeaderboard = () => {
    gameNav.navigate("LeaderboardScreen");
  };

  return (
        <ThemedView
          center="both"
          className="gap-y-5"
        >
          <Header/>
          <ThemedButton title="Iniciar Jogo" onPress={goToKarRunner} className="w-64" />
          <ThemedButton title="Roletar Carro" onPress={goToCarSpin} className="w-64" />
          <ThemedButton title="Trocar carro" onPress={goToCarSelection} className="w-64" />
          <ThemedButton title="Leaderboard" onPress={goToLeaderboard} className="w-64" />
          <ThemedButton title="Minha Conta" onPress={goToUserProfile} className="w-64" />
          <ThemedButton title="Sair" className="w-64 bg-red-500" onPress={goToAuth} />
        </ThemedView>
    );
};
