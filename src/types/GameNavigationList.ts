import { StackNavigationProp } from "@react-navigation/stack";

export type GameNavigationList = {
  MainScreen: undefined;
  LeaderboardScreen: undefined;
  GameNavigationScreen: undefined;
  ChangeCarScreen: undefined;
  CarRouletteScreen: undefined;
  PlayerStatsScreen: undefined;
  GameOverScreen: undefined;
}
export type GameNavigationProps = StackNavigationProp<GameNavigationList>;


