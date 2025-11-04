import { ThemedText } from '@/components/themed/ThemedText';
import { createStackNavigator } from '@react-navigation/stack';
import { LeaderBoardScreen } from '@/screens/game/LeaderBoardScreen';
import { CarSelection } from '@/screens/game/CarSelection';

const Stack = createStackNavigator();

export const MainStackScreen = 'MainScreen';
export const LeaderboardStackScreen = 'LeaderboardScreen';
export const GameNavigationStackScreen = 'GameNavigationScreen';
export const CarSelectionStackScreen = 'ChangeCarScreen';
export const CarRouletteStackScreen = 'CarRouletteScreen';
export const PlayerStatsStackScreen = 'PlayerStatsScreen';

// TODO: Implementar todos os componentes da navegação do jogo
export const GameNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={CarSelectionStackScreen}>
      <Stack.Screen
        name={MainStackScreen}
        component={ThemedText}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={LeaderboardStackScreen}
        component={LeaderBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={GameNavigationStackScreen}
        component={ThemedText}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CarSelectionStackScreen}
        component={CarSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CarRouletteStackScreen}
        component={ThemedText}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PlayerStatsStackScreen}
        component={ThemedText}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
