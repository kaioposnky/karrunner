import { Car } from "@/types/Car";

export type GameObject = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Obstacle = GameObject & {
  id:string;
  imageUrl?: string;
};

export type PlayerCar = GameObject & {
  carInfo: Car;
};
