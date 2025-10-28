import { ThemedText } from '@/components/themed/ThemedText';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const MainScreen = "MainScreen";
export const LeaderboardScreen = "LeaderboardScreen";
export const GameNavigationScreen = "GameNavigationScreen";
export const ChangeCarScreen = "ChangeCarScreen";
export const CarRouletteScreen = "CarRouletteScreen";
export const PlayerStatsScreen = "PlayerStatsScreen";

// TODO: Implementar todos os componentes da navegação do jogo
export const GameNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={LeaderboardScreen}>
      <Stack.Screen name={MainScreen} component={ThemedText} />
      <Stack.Screen name={LeaderboardScreen} component={ThemedText} />
      <Stack.Screen name={GameNavigationScreen} component={ThemedText} />
      <Stack.Screen name={ChangeCarScreen} component={ThemedText} />
      <Stack.Screen name={CarRouletteScreen} component={ThemedText} />
      <Stack.Screen name={PlayerStatsScreen} component={ThemedText} />
    </Stack.Navigator>
  );
};
