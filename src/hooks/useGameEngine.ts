import { Car } from "@/types/Car";
import { calculatePlayerNewXPosition, checkPlayerColisions } from "@/utils/positionCalculate";
import { AccelerometerMeasurement } from "expo-sensors";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

export type Obstacle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PlayerCar = {
  carInfo: Car;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Dimensões da tela
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Constantes do jogo
const FRAME_RATE = 60; // 60 FPS
const GAME_TICKS_IN_MS = 1000 / FRAME_RATE;

// Constantes da estrada
const ROAD_WIDTH = SCREEN_WIDTH * 0.8; // 80% da tela
const ROAD_RIGHT_BORDER = ROAD_WIDTH;
const ROAD_LEFT_BORDER = SCREEN_WIDTH * 0.05;

// Constantes do jogador
const PLAYER_CAR_WIDTH = 50;
const PLAYER_CAR_HEIGHT = 50;
const PLAYER_CAR_START_Y = -65 + SCREEN_HEIGHT - (PLAYER_CAR_HEIGHT) * 2; // Posição inicial Y do carro
const PLAYER_CAR_MAX_SPEED = 0.7; // Não passa de 0.5 e -0.5, limite do acelerômetro
const PLAYER_CAR_MIN_SPEED = 0.05; // Não passa de 0.1 e -0.1, deadzone do acelerômetro
const PLAYER_CAR_SPACE_MOVEMENT_CONSTANT = 50; // Sensibilidade do movimento do carro

// Constantes dos Objetos do mapa
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_START_Y_POSITION = -100;
const OBSTACLE_GENERATION_INTERVAL = 300; // Intervalo de tempo entre a geração de obstáculos em ms
const OBSTACLE_SPEED = 5; // Velocidade dos obstáculos

const DEVICE_DIRECTION_MULTIPLIER = Platform.select({
  ios: 1,
  android: -1,
  default: 1
});

export const useGameEngine = (accelerometerData: AccelerometerMeasurement, selectedCar: Car, shouldRun: boolean) => {

  // Estados da estrada
  const [roadPosition1, setRoadPosition1] = useState<number>(0);
  const [roadPosition2, setRoadPosition2] = useState<number>(-SCREEN_WIDTH);

  // Estados dos obstáculos
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [obstaclesTimer, setObstaclesTimer] = useState<number>(OBSTACLE_GENERATION_INTERVAL);

  // Estados do jogador
  const [playerCar, setPlayerCar] = useState<PlayerCar>(

    {
      carInfo: selectedCar,
      x: 0,
      y: PLAYER_CAR_START_Y,
      width: PLAYER_CAR_WIDTH,
      height: PLAYER_CAR_HEIGHT
    });

  // Pontuações e gameState
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);


  useEffect(() => {
    if (!shouldRun || !accelerometerData || gameOver) return;

    const gameLoop = setInterval(() => {
      const actualXPosition = playerCar.x;
      // ----------------------
      // Mover carro no frame
      // ----------------------

      const speedX = accelerometerData.x * DEVICE_DIRECTION_MULTIPLIER;

      // Atualiza a posição do carro, considerando os limites da estrada
      let newXPosition = calculatePlayerNewXPosition(
        actualXPosition,
        speedX,
        PLAYER_CAR_SPACE_MOVEMENT_CONSTANT,
        PLAYER_CAR_MAX_SPEED,
        PLAYER_CAR_MIN_SPEED,
        ROAD_LEFT_BORDER,
        ROAD_RIGHT_BORDER
      );
      setPlayerCar({...playerCar, x: newXPosition});

      // ----------------------
      // Mover e Limpar Obstáculos
      // ----------------------

      setObstacles(currentObstacles =>
        currentObstacles
          .map(o => ({ ...o, y: o.y + OBSTACLE_SPEED }))
          .filter(o => o.y < SCREEN_HEIGHT + OBSTACLE_HEIGHT)
      );

      // ----------------------
      // Gerar novos obstaculos
      // ----------------------

      const randomPositionInRoad = (width : number) => {
        const min = ROAD_LEFT_BORDER + width/2;
        const max = ROAD_RIGHT_BORDER - width/2;
        return Math.random() * (max - min) + min;
      }

      setObstaclesTimer(currentTimer => {
        if (currentTimer <= 0) {
          setObstacles(currentObs => {
            const newObstacle: Obstacle = {
              id: Date.now().toString(),
              y: OBSTACLE_START_Y_POSITION,
              // Gera um X aleatório dentro dos limites da pista
              x: randomPositionInRoad(OBSTACLE_WIDTH),
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT
            };
            return [...currentObs, newObstacle];
          });
          return OBSTACLE_GENERATION_INTERVAL; // reiniciar timer
        }
        return currentTimer - GAME_TICKS_IN_MS; // decrementar timer em ms
      });

      // ----------------------
      // Verificar colisoes
      // ----------------------
      const collisionDetected = checkPlayerColisions(playerCar, obstacles);
      if (collisionDetected) {
        setGameOver(true);
      }

      // ----------------------
      // Logs de Depuração
      // ----------------------
      console.log({
        carX: newXPosition.toFixed(2),
        obstaclesCount: obstacles.length,
        isGameOver: gameOver,
        nextObstacleIn: obstaclesTimer.toFixed(0),
      });

    }, GAME_TICKS_IN_MS);

    return () => clearInterval(gameLoop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accelerometerData, shouldRun, gameOver]);

  return {
    obstacles,
    playerCar,
    score,
    highScore,
    gameOver,
    roadPosition1,
    roadPosition2
  };
};
