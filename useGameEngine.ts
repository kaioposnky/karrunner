// Constantes da estrada
const ROAD_LEFT_BORDER = SCREEN_WIDTH * 0.1; // 10% margem esquerda
const ROAD_RIGHT_BORDER = SCREEN_WIDTH * 0.9; // 10% margem direita
const ROAD_WIDTH = ROAD_RIGHT_BORDER - ROAD_LEFT_BORDER; // Largura efetiva da estrada
const ROAD_LANES = 4;
const ROAD_LANE_WIDTH = ROAD_WIDTH / ROAD_LANES; // Cada lane ocupa 1/4 da estrada
const LANE_POSITIONS = [
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 0.5, // Centro da lane 1
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 1.5, // Centro da lane 2
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 2.5, // Centro da lane 3
  ROAD_LEFT_BORDER + ROAD_LANE_WIDTH * 3.5, // Centro da lane 4
];
