import { Obstacle, PlayerCar } from "@/types/Game";

export const calculatePlayerNewXPosition = (
  actualPosition: number,
  speed: number,
  spaceMovementConstant: number,
  maxSpeed: number,
  minSpeed: number,
  borderLeft: number,
  borderRight: number
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
  if (finalPosition < borderLeft) {
    return borderLeft;
  } else if (finalPosition > borderRight) {
    return borderRight;
  }
  return finalPosition;
};

export const checkPlayerColisions = (
  playerCar: PlayerCar,
  obstacles: Obstacle[]
): boolean => {
  for (const obstacle of obstacles) {
    if (checkPlayerAreaWithObstacle(playerCar, obstacle)){
      return true;
    };
  }
  return false;
};

const HEIGHT_DEADZONE = 5;
// Checa a colisão do jogador com um objeto, a lógica é:
// Se esquerda do carro estiver menor do que a direita do objeto
// E se a direita do carro estiver maior do que a esquerda do objeto
// E se a altura do topo do carro estiver maior do que a altura da base do objeto
// E se a altura da base do carro estiver menor do que a altura do topo do objeto
// Ele colide com o objeto (colisão 2D)
const checkPlayerAreaWithObstacle = (playerCar: PlayerCar, obstacle: Obstacle) => {
  const carLeftPointX = playerCar.x - (playerCar.width / 2);
  const carRightPointX = playerCar.x + (playerCar.width / 2);

  const obstacleLeftPointX = obstacle.x - (obstacle.width / 2);
  const obstacleRightPointX = obstacle.x + (obstacle.width / 2);

  const carTopPointY = playerCar.y + (playerCar.height / 2);
  const carBottomPointY = playerCar.y - (playerCar.height / 2);

  const obstacleBottomPointY = obstacle.y;
  const obstacleTopPointY = obstacle.y + obstacle.height;

  if((carLeftPointX <= obstacleRightPointX && carRightPointX >= obstacleLeftPointX)
    && (carTopPointY + HEIGHT_DEADZONE >= obstacleBottomPointY && carBottomPointY + HEIGHT_DEADZONE <= obstacleTopPointY)){
    return true;
  }
  return false;
}
