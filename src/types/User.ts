import { Car } from "./Car";

export interface User {
  uid: string;
  displayName: string;
  email: string;
  cars: Car[]; // Carros que o usuário tem
  selectedCar: Car | null; // Carro selecionado que será usado no jogo
}
