import { AuthNavigationProps } from "./AuthNavigationList";
import { GameNavigationProps } from "./GameNavigationList";

export type RootNavigationList = {
  AuthNavigation: AuthNavigationProps;
  GameNavigation: GameNavigationProps;
  MainScreen: undefined;
};
