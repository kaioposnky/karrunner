import { ThemedText } from '@/components/themed/ThemedText';
import { createStackNavigator } from '@react-navigation/stack';
import { LeaderBoardScreen } from '@/screens/game/LeaderBoardScreen';
import { CarSelectionScreen } from '@/screens/game/CarSelectionScreen';
import { CarSpinScreen } from '@/screens/game/CarSpinScreen';
import { GameMainMenu } from '@/screens/game/GameMainMenu';
import { KarRunnerGameScreen } from '@/screens/game/KarRunnerGameScreen';
import { UserProfileScreen } from '@/screens/game/UserProfileScreen';

const Stack = createStackNavigator();

export const LeaderboardStackScreen = 'LeaderboardScreen';
export const GameMainMenuStackScreen = 'GameMainMenu';
export const CarSelectionStackScreen = 'CarSelectionScreen';
export const CarSpinStackScreen = 'CarSpinScreen';
export const UserProfileStackScreen = 'UserProfileScreen';
export const KarRunnerGameStackScreen = 'KarRunnerGameScreen';

// TODO: Implementar todos os componentes da navegação do jogo
export const GameNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={GameMainMenuStackScreen}>
      <Stack.Screen
      name={KarRunnerGameStackScreen}
      component={KarRunnerGameScreen}
      options={{headerShown: false}}
      />
      <Stack.Screen
        name={LeaderboardStackScreen}
        component={LeaderBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={GameMainMenuStackScreen}
        component={GameMainMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CarSelectionStackScreen}
        component={CarSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CarSpinStackScreen}
        component={CarSpinScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={UserProfileStackScreen}
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
