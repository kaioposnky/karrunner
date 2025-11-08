import { Car } from "@/types/Car";
import { Obstacle, PlayerCar } from "@/types/Game";
import {
  calculatePlayerNewXPosition,
  checkPlayerColisions,
} from "@/utils/positionCalculate";
import { AccelerometerMeasurement } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Platform } from "react-native";

// Dimensões da tela
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Constantes do jogo
const FRAME_RATE = 60; // 60 FPS
const GAME_TICKS_IN_MS = 1000 / FRAME_RATE;

// Constantes do jogador
const PLAYER_CAR_WIDTH = 60;
const PLAYER_CAR_HEIGHT = 60;
const PLAYER_CAR_START_Y = -65 + SCREEN_HEIGHT - PLAYER_CAR_HEIGHT * 2; // Posição inicial Y do carro
const PLAYER_CAR_MAX_SPEED = 0.7; // Não passa de 0.5 e -0.5, limite do acelerômetro
const PLAYER_CAR_MIN_SPEED = 0.05; // Não passa de 0.1 e -0.1, deadzone do acelerômetro
const PLAYER_CAR_SPACE_MOVEMENT_CONSTANT = 10; // Sensibilidade do movimento do carro
const PLAYER_HITBOX_X_DEADZONE = 35;
const PLAYER_HITBOX_Y_DEADZONE = 37;

// Constantes dos Objetos do mapa
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 60;
const OBSTACLE_START_Y_POSITION = -100;
const OBSTACLE_GENERATION_INTERVAL = 250; // Intervalo de tempo entre a geração de obstáculos em ms
const OBSTACLE_SPEED = 5; // Velocidade dos obstáculos

// Constantes da estrada
const LANE_MAGIC_OFFSET = -8;
const ROAD_LEFT_BORDER = SCREEN_WIDTH * 0.05; // Tamanho da borda da esquerda do mapa
const ROAD_RIGHT_BORDER = SCREEN_WIDTH * 0.9; // Tamanho da borda direita do mapa
const ROAD_WIDTH = ROAD_RIGHT_BORDER - ROAD_LEFT_BORDER;
const ROAD_LANES = 4; // Quantidade de faixas da estrada
const ROAD_SPEED = 5; // Velocidade da estrada
const ROAD_LANE_WIDTH = ROAD_WIDTH / ROAD_LANES;
const ITEM_WIDTH_FOR_CENTER = OBSTACLE_WIDTH;
const LANE_POSITIONS = [ // Posições das faixas
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 0.5 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET - 20,
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 1.5 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET - 15,
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 2.5 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET - 6,
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 3.5 - ITEM_WIDTH_FOR_CENTER / 2 + LANE_MAGIC_OFFSET + 2,
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

  // Estados do jogador
  const [playerCar, setPlayerCar] = useState<PlayerCar>(getInitialPlayerCar(selectedCar));

  // Pontuações e gameState
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const playerCarRef = useRef(getInitialPlayerCar(selectedCar));
  const obstaclesRef = useRef<Obstacle[]>([]);
  const obstaclesTimerRef = useRef<number>(OBSTACLE_GENERATION_INTERVAL);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);

  // Obtêm uma pista aleatória para o carro dar spawn
  const randomLanePositionInRoad = (): number => {
    const randomLane = Math.floor(Math.random() * LANE_POSITIONS.length);
    return LANE_POSITIONS[randomLane];
  };

  // Posição aleatória na pista
  const randomXPositionInRoad = (): number => {
      const MAX_OBSTACLE_OFFSET = 50;
      const randomLanePosition = randomLanePositionInRoad();
      const randomOffset =
        Math.floor(Math.random() * MAX_OBSTACLE_OFFSET - Math.random() * MAX_OBSTACLE_OFFSET);

      const desiredPosition = randomLanePosition + randomOffset;

      const minX = ROAD_LEFT_BORDER;
      const maxX = ROAD_RIGHT_BORDER - (OBSTACLE_WIDTH / 2);

      // 3. Usa Math.max e Math.min para garantir que a posição final esteja dentro dos limites
      // Math.max garante que a posição não seja MENOR que o mínimo permitido
      // Math.min garante que a posição não seja MAIOR que o máximo permitido
      const finalPosition = Math.min(maxX, Math.max(minX, desiredPosition));

      return finalPosition;
  }

  useEffect(() => {
    if (!shouldRun || !accelerometerData || gameOver) return;

    let animationFrame: number;

    const gameLoop = () => {
      if (gameOverRef.current) {
        return;
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

      const carSpeedX = accelerometerData.x * DEVICE_DIRECTION_MULTIPLIER;

      // Atualiza a posição do carro, considerando os limites da estrada
      playerCarRef.current.x = calculatePlayerNewXPosition(
        playerCarRef.current.x,
        carSpeedX,
        PLAYER_CAR_SPACE_MOVEMENT_CONSTANT,
        PLAYER_CAR_MAX_SPEED,
        PLAYER_CAR_MIN_SPEED,
        ROAD_LEFT_BORDER,
        SCREEN_WIDTH * 0.80 // NÃO PERGUNTE SOBRE ESSE NÚMERO, APENAS ACEITE
      );

      // ----------------------
      // Mover e Limpar Obstáculos
      // ----------------------

      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obstacle = obstaclesRef.current[i];
        obstacle.y += OBSTACLE_SPEED;

        if (obstacle.y >= SCREEN_HEIGHT + OBSTACLE_HEIGHT) {
          obstaclesRef.current.splice(i, 1);
        }
      }

      // ----------------------
      // Verificar colisoes
      // ----------------------

      const collisionDetected = checkPlayerColisions(
        playerCarRef.current,
        obstaclesRef.current,
        PLAYER_HITBOX_X_DEADZONE,
        PLAYER_HITBOX_Y_DEADZONE
      );
      if (collisionDetected) {
        gameOverRef.current = true;
        setGameOver(true);
        return;
      }

      // ----------------------
      // Gerar novos obstaculos
      // ----------------------

      obstaclesTimerRef.current -= GAME_TICKS_IN_MS;
      if (obstaclesTimerRef.current <= 0) {
        const randomCarImage = allCars?.[Math.floor(Math.random() * allCars.length)]?.images?.run;
        const newObstacle: Obstacle = {
          id: Date.now().toString(),
          y: OBSTACLE_START_Y_POSITION,
          x: randomXPositionInRoad(),
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
          imageUrl: randomCarImage || "https://i.postimg.cc/zfnyVrCQ/hb20s.png"
        };
        obstaclesRef.current.push(newObstacle);
        obstaclesTimerRef.current = OBSTACLE_GENERATION_INTERVAL;
      }

      // ----------------------
      // Aumentar Pontuação
      // ----------------------

      scoreRef.current += 1 / 6;

      // ----------------------
      // Logs de Depuração
      // ----------------------
      console.log({
        carX: playerCarRef.current.x.toFixed(2),
        obstaclesCount: obstaclesRef.current.length,
        isGameOver: gameOver,
        nextObstacleIn: obstaclesTimerRef.current.toFixed(0),
      });

      // ----------------------
      // Sincronização dos estados
      // ----------------------

      setPlayerCar({ ...playerCarRef.current });
      setObstacles([...obstaclesRef.current]);
      setScore(scoreRef.current);

       animationFrame = requestAnimationFrame(gameLoop);
    };

    animationFrame = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accelerometerData, shouldRun, gameOver]);

  const restartGame = () => {
    setScore(0);
    setObstacles([]);
    setPlayerCar(getInitialPlayerCar(selectedCar));
    gameOverRef.current = false;
    playerCarRef.current = getInitialPlayerCar(selectedCar);
    obstaclesRef.current = [];
    obstaclesTimerRef.current = OBSTACLE_GENERATION_INTERVAL;
    scoreRef.current = 0;

    setGameOver(false);
    setPlayerCar(playerCarRef.current);
    setObstacles(obstaclesRef.current);
    setScore(scoreRef.current);
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
