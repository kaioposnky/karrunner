import { AccelerometerMeasurement } from "expo-sensors";
import { ThemedView } from "../themed/ThemedView";
import { Car } from "@/types/Car";
import { useEffect } from "react";
import { PlayerCarComponent } from "./PlayerCarComponent";
import { useGameEngine } from "@/hooks/useGameEngine";
import { ObstacleComponent } from "./ObstacleComponent";
import { Dimensions, Image } from "react-native";
import roadImage from "@/assets/game/road.png";
import { GameOverModal } from "./GameOverModal";

interface KarRunnerGameProps {
  accelerometerData: AccelerometerMeasurement;
  selectedCar: Car;
  onGameEnd: (score: number) => void;
  highScore: number;
  allCars: Car[] | null;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const KarRunnerGame = ({ accelerometerData, selectedCar, onGameEnd, highScore, allCars }: KarRunnerGameProps) => {
  // Toda a lógica de atualização do jogo é feita pelo hook de Game Engine
  const { obstacles, playerCar, score, gameOver, roadPosition1, roadPosition2, restartGame } =
    useGameEngine(accelerometerData, selectedCar, true, allCars);

  useEffect(() => {
    if (gameOver) {
      onGameEnd(score);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  return (
    <ThemedView className="flex-1">
      {/* Imagens da estrada renderizadas primeiro para ficarem no fundo */}
      <Image
        source={roadImage}
        style={{
          position: 'absolute',
          width: "100%",
          height: SCREEN_HEIGHT,
          transform: [{ translateY: roadPosition1 }],
        }}
        resizeMode="cover"
      />
      <Image
        source={roadImage}
        style={{
          position: 'absolute',
          width: "100%",
          height: SCREEN_HEIGHT,
          transform: [{ translateY: roadPosition2 }],
        }}
        resizeMode="cover"
      />

      <PlayerCarComponent
        style={{
          position: 'absolute',
          transform: [{ translateX: playerCar.x }, { translateY: playerCar.y }],
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
            imageUrl={obstacle.imageUrl}
          />
        );
      })}

      <GameOverModal
        score={score}
        highScore={highScore}
        onPlayAgain={restartGame}
        visible={gameOver}
      />

    </ThemedView>
  );
};
