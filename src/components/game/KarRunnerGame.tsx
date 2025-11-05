import { AccelerometerMeasurement } from "expo-sensors";
import { ThemedView } from "../themed/ThemedView";
import { Car } from "@/types/Car";
import { useEffect } from "react";
import { PlayerCarComponent } from "./PlayerCarComponent";
import { useGameEngine } from "@/hooks/useGameEngine";
import { ObstacleComponent } from "./ObstacleComponent";

interface KarRunnerGameProps {
  accelerometerData: AccelerometerMeasurement;
  selectedCar: Car;
  onGameEnd: (score: number) => void;
}

export const KarRunnerGame = ({ accelerometerData, selectedCar, onGameEnd }: KarRunnerGameProps) => {
  // Toda a lógica de atualização do jogo é feita pelo hook de Game Engine
  const { obstacles, playerCar, score, highScore, gameOver } =
    useGameEngine(accelerometerData, selectedCar, true);

  useEffect(() => {
    if (gameOver) {
      onGameEnd(score);
    }
  }, [gameOver, onGameEnd, score]);

  console.info("X e Y:", playerCar.x, playerCar.y)

  return (
    <ThemedView className="flex-1">
      <PlayerCarComponent
        style={{
          // Quando você atualiza X o state, o componente atualiza junto
          position: 'absolute',
          transform: [{ translateX: playerCar.x }, { translateY: playerCar.y }]
        }}
        car={playerCar}
      />

      {obstacles.map((obstacle) => {
        return (
          <ObstacleComponent
            key={obstacle.id}
            style={{
              position: 'absolute',
              transform: [{ translateX: obstacle.x }, { translateY: obstacle.y }]
            }}
            obstacle={obstacle}
          />
        );
      })}
    </ThemedView>
  );
};
