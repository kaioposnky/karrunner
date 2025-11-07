import { Car } from "@/types/Car";
import { calculatePlayerNewXPosition, checkPlayerColisions } from "@/utils/positionCalculate";
import { AccelerometerMeasurement } from "expo-sensors";
import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

export type Obstacle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl?: string;
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

// Constantes do jogador
const PLAYER_CAR_WIDTH = 25;
const PLAYER_CAR_HEIGHT = 60;
const PLAYER_CAR_START_Y = -65 + SCREEN_HEIGHT - PLAYER_CAR_HEIGHT * 2; // Posição inicial Y do carro
const PLAYER_CAR_MAX_SPEED = 0.7; // Não passa de 0.5 e -0.5, limite do acelerômetro
const PLAYER_CAR_MIN_SPEED = 0.05; // Não passa de 0.1 e -0.1, deadzone do acelerômetro
const PLAYER_CAR_SPACE_MOVEMENT_CONSTANT = 50; // Sensibilidade do movimento do carro

// Constantes dos Objetos do mapa
const OBSTACLE_WIDTH = 25;
const OBSTACLE_HEIGHT = 60;
const OBSTACLE_START_Y_POSITION = -100;
const OBSTACLE_GENERATION_INTERVAL = 700; // Intervalo de tempo entre a geração de obstáculos em ms
const OBSTACLE_SPEED = 4; // Velocidade dos obstáculos

// Constantes da estrada
const LANE_MAGIC_OFFSET = -8;
const ROAD_LEFT_BORDER = SCREEN_WIDTH * 0.1; // Tamanho da borda da esquerda do mapa
const ROAD_RIGHT_BORDER = SCREEN_WIDTH * 0.9; // Tamanho da borda direita do mapa
const ROAD_WIDTH = ROAD_RIGHT_BORDER - ROAD_LEFT_BORDER;
const ROAD_LANES = 4; // Quantidade de faixas da estrada
const ROAD_SPEED = 5; // Velocidade da estrada
const ROAD_LANE_WIDTH = ROAD_WIDTH / ROAD_LANES;
const ITEM_WIDTH_FOR_CENTER = OBSTACLE_WIDTH;
const LANE_POSITIONS = [ // Posições das faixas
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 0.6 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET - 15,
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 1.6 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET - 8,
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 2.6 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET,
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 3.6 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET + 10,
];

const DEVICE_DIRECTION_MULTIPLIER = Platform.select({
  ios: 1,
  android: -1,
  default: 1
});

export const useGameEngine = (accelerometerData: AccelerometerMeasurement, selectedCar: Car, shouldRun: boolean, allCars: Car[] | null) => {

  const getInitialPlayerCar = (selectedCar: Car) : PlayerCar  => {
    return {
      carInfo: selectedCar,
        x: 0,
          y: PLAYER_CAR_START_Y,
            width: PLAYER_CAR_WIDTH,
              height: PLAYER_CAR_HEIGHT
    }
  };

  // Estados da estrada
  const [roadPosition1, setRoadPosition1] = useState<number>(0);
  const [roadPosition2, setRoadPosition2] = useState<number>(-SCREEN_WIDTH);

  // Estados dos obstáculos
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [obstaclesTimer, setObstaclesTimer] = useState<number>(OBSTACLE_GENERATION_INTERVAL);

  // Estados do jogador
  const [playerCar, setPlayerCar] = useState<PlayerCar>(getInitialPlayerCar(selectedCar));

  // Pontuações e gameState
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldRun || !accelerometerData || gameOver) return;

    const gameLoop = setInterval(() => {
      // ----------------------
      // Verificar colisoes
      // ----------------------

      const collisionDetected = checkPlayerColisions(playerCar, obstacles);
      if (collisionDetected) {
        setGameOver(true);
      }

      // ----------------------
      // Mover a estrada no frame
      // ----------------------

      // Removido por estar bugado
      // setRoadPosition1(currentPos => {
      //   return currentPos >= SCREEN_HEIGHT ? -SCREEN_HEIGHT : currentPos + ROAD_SPEED;
      // });
      // setRoadPosition2(currentPos => {
      //   return currentPos >= SCREEN_HEIGHT ? -SCREEN_HEIGHT : currentPos + ROAD_SPEED;
      // });

      // ----------------------
      // Mover carro no frame
      // ----------------------

      const actualCarXPosition = playerCar.x;
      const carSpeedX = accelerometerData.x * DEVICE_DIRECTION_MULTIPLIER;

      // Atualiza a posição do carro, considerando os limites da estrada
      let newCarXPosition = calculatePlayerNewXPosition(
        actualCarXPosition,
        carSpeedX,
        PLAYER_CAR_SPACE_MOVEMENT_CONSTANT,
        PLAYER_CAR_MAX_SPEED,
        PLAYER_CAR_MIN_SPEED,
        ROAD_LEFT_BORDER,
        SCREEN_WIDTH * 0.75 // NÃO PERGUNTE SOBRE ESSE NÚMERO, APENAS ACEITE
      );
      setPlayerCar({ ...playerCar, x: newCarXPosition });

      // ----------------------
      // Mover e Limpar Obstáculos
      // ----------------------

      if (obstacles.length > 0) {
        setObstacles((currentObstacles) =>
          currentObstacles
            .map((o) => ({ ...o, y: o.y + OBSTACLE_SPEED }))
            .filter((o) => o.y < SCREEN_HEIGHT + OBSTACLE_HEIGHT)
        );
      }

      // ----------------------
      // Gerar novos obstaculos
      // ----------------------

      // Obtêm uma pista aleatória para o carro dar spawn
      const randomLanePositionInRoad = (): number => {
        const randomLane = Math.floor(Math.random() * LANE_POSITIONS.length);
        return LANE_POSITIONS[randomLane];
      };

      setObstaclesTimer((currentTimer) => {
        if (currentTimer <= 0) {
          setObstacles((currentObs) => {
            const randomCarImage = allCars?.[Math.floor(Math.random() * allCars.length)]?.images?.run;
            const newObstacle: Obstacle = {
              id: Date.now().toString(),
              y: OBSTACLE_START_Y_POSITION,
              x: randomLanePositionInRoad(),
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT,
              imageUrl: randomCarImage || "https://i.postimg.cc/zfnyVrCQ/hb20s.png"
            };
            return [...currentObs, newObstacle];
          });
          return OBSTACLE_GENERATION_INTERVAL; // reiniciar timer
        }
        return currentTimer - GAME_TICKS_IN_MS; // decrementar timer em ms
      });

      // ----------------------
      // Logs de Depuração
      // ----------------------
      console.log({
        carX: newCarXPosition.toFixed(2),
        obstaclesCount: obstacles.length,
        isGameOver: gameOver,
        nextObstacleIn: obstaclesTimer.toFixed(0),
      });

      // ----------------------
      // Aumentar Pontuação
      // ----------------------

      setScore((s) => s + 1/6);

    }, GAME_TICKS_IN_MS);

    return () => clearInterval(gameLoop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accelerometerData, shouldRun, gameOver]);

  const restartGame = () => {
    setScore(0);
    setObstacles([]);
    setPlayerCar(getInitialPlayerCar(selectedCar));
    setGameOver(false);
  }

  return {
    obstacles,
    playerCar,
    score,
    gameOver,
    restartGame,
    roadPosition1,
    roadPosition2
  };
};
