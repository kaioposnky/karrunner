import { Obstacle, PlayerCar } from "@/types/Game";

export const calculatePlayerNewPosition = (
  actualPosition: number,
  speed: number,
  spaceMovementConstant: number,
  maxSpeed: number,
  minSpeed: number,
  border1: number,
  border2: number
): number => {
  // Remove parte da aceleração para o carro não sair voando
  if (speed > maxSpeed){
    speed = maxSpeed;
  } else if (speed < -maxSpeed){
    speed = -maxSpeed;
  }

  // Dead zone para o carro não ficar dançando
  if (speed > -minSpeed && speed < minSpeed){
    speed = 0;
  }
  // Multiplicamos a velocidade pela constante de movimento
  const addedMovement = speed * spaceMovementConstant;
  const finalPosition = Math.round(actualPosition + addedMovement);
  if (finalPosition < border1) {
    return border1;
  } else if (finalPosition > border2) {
    return border2;
  }
  return finalPosition;
};

export const checkPlayerColisions = (
  playerCar: PlayerCar,
  obstacles: Obstacle[],
  deadzoneX?: number,
  deadzoneY?: number
): boolean => {
  for (const obstacle of obstacles) {
    if (checkPlayerAreaWithObstacle(playerCar, obstacle, deadzoneX, deadzoneY)){
      return true;
    };
  }
  return false;
};

// Checa a colisão do jogador com um objeto, a lógica é:
// Se esquerda do carro estiver menor do que a direita do objeto
// E se a direita do carro estiver maior do que a esquerda do objeto
// E se a altura do topo do carro estiver maior do que a altura da base do objeto
// E se a altura da base do carro estiver menor do que a altura do topo do objeto
// Ele colide com o objeto (colisão 2D)
const checkPlayerAreaWithObstacle = (playerCar: PlayerCar, obstacle: Obstacle, deadzoneX?: number, deadzoneY?: number) => {
  const carLeftPointX = playerCar.x - (playerCar.width / 2);
  const carRightPointX = playerCar.x + (playerCar.width / 2);

  const obstacleLeftPointX = obstacle.x - (obstacle.width / 2);
  const obstacleRightPointX = obstacle.x + (obstacle.width / 2);

  const carTopPointY = playerCar.y + (playerCar.height / 2);
  const carBottomPointY = playerCar.y - (playerCar.height / 2);

  const obstacleBottomPointY = obstacle.y;
  const obstacleTopPointY = obstacle.y + obstacle.height;
  deadzoneX = deadzoneX || 0;
  deadzoneY = deadzoneY || 0;

  if((carLeftPointX + deadzoneX <= obstacleRightPointX && carRightPointX - deadzoneX >= obstacleLeftPointX)
    && (carTopPointY - deadzoneY >= obstacleBottomPointY && carBottomPointY + deadzoneY <= obstacleTopPointY)){
    return true;
  }
  return false;
}
