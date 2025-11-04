import { Rarity } from "./Rarity";

export interface Car {
  id: string;
  name: string;
  rarity: Rarity;
  unlocked?: boolean | null;
  images: {
    side: string,
    run: string
  }
};
