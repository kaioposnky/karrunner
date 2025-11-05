import { AccelerometerMeasurement } from "expo-sensors";
import { ThemedView } from "../themed/ThemedView";
import { Car } from "@/types/Car";
import { useEffect } from "react";
import { PlayerCarComponent } from "./PlayerCarComponent";
import { useGameEngine } from "@/hooks/useGameEngine";
import { ObstacleComponent } from "./ObstacleComponent";
import { Image } from "react-native";
import roadImage from "@/assets/game/road.png";

interface KarRunnerGameProps {
  accelerometerData: AccelerometerMeasurement;
  selectedCar: Car;
  onGameEnd: (score: number) => void;
}

// Carregue sua imagem da estrada (ajuste o caminho se necessário)

export const KarRunnerGame = ({ accelerometerData, selectedCar, onGameEnd }: KarRunnerGameProps) => {
  // Toda a lógica de atualização do jogo é feita pelo hook de Game Engine
  const { obstacles, playerCar, score, highScore, gameOver, roadPosition1, roadPosition2 } =
    useGameEngine(accelerometerData, selectedCar, true);

  useEffect(() => {
    if (gameOver) {
      onGameEnd(score);
    }
  }, [gameOver, onGameEnd, score]);

  return (
    <ThemedView className="flex-1">
      {/* Imagens da estrada renderizadas primeiro para ficarem no fundo */}
      <Image
        source={roadImage}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: [{ translateY: roadPosition1 }],
        }}
        resizeMode="cover"
      />
      <Image
        source={roadImage}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
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
          />
        );
      })}
    </ThemedView>
  );
};
