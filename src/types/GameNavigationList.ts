import { StackNavigationProp } from "@react-navigation/stack";

export type GameNavigationList = {
  LeaderboardScreen: undefined;
  GameMainMenu: undefined;
  CarSelectionScreen: undefined;
  CarSpinScreen: undefined;
  PlayerStatsScreen: undefined;
}
export type GameNavigationProps = StackNavigationProp<GameNavigationList>;
