import { get, ref, getDatabase, child, set } from "firebase/database";
import { Car } from "@/types/Car";

const USER_SELECTED_CAR_PATH = (id: string) => (`users/${id}/selectedCar`);
const USER_CARS_PATH = (id: string) => (`users/${id}/cars`);
const CAR_PATH = (id: string) => (`cars/${id}`);

export async function getUserSelectedCar(userId: string) : Promise<string | null> {
  const dbRef = ref(getDatabase());

  const carId : string | null = await get(child(dbRef, USER_SELECTED_CAR_PATH(userId)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar carro selecionado do usuário:", error);
      return null;
    });

  return carId;
};

export async function setUserSelectedCar(userId: string, carId: string){
  const dbRef = ref(getDatabase());

  try{
    await set(child(dbRef, USER_SELECTED_CAR_PATH(userId)), carId);
  } catch (error){
    console.error("Erro ao atualizar carro selecionado:", error);
    throw new Error(`Erro ao atualizar carro selecionado: ${error}`);
  }
};

export async function getRandomCar() {
  const cars = await getAllCars();

  const randomIndex = Math.floor(Math.random() * cars.length);
  return cars[randomIndex];
}

export async function getCarById(carId: string) {
  const dbRef = ref(getDatabase());

  const car = await get(child(dbRef, CAR_PATH(carId)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar carro:", error);
      return null;
    });

  return car;
}

export async function getUserCars(userId: string): Promise<Car[]> {
  const dbRef = ref(getDatabase());
  const userCarsRef = child(dbRef, USER_CARS_PATH(userId));

  const snapshot = await get(userCarsRef);

  const carIdMap = snapshot.val();
  const carIds = Object.keys(carIdMap);

  // Obtêm todos os carros
  const carPromises = carIds.map(id => getCarById(id));
  const carResults = await Promise.all(carPromises);

  // Remover carros nulos caso tenha
  return carResults.filter((car): car is Car => car !== null);
}

export async function addUserCar(userId: string, carId: string): Promise<void> {
  const db = getDatabase();
  const userCarRef = ref(db, `users/${userId}/cars/${carId}`);

  try {
    await set(userCarRef, true);
  } catch (error) {
    console.error("Erro ao adicionar carro para o usuário:", error);
    throw new Error("Não foi possível adicionar o carro ao usuário.");
  }
}

export async function getAllCars(): Promise<Car[]> {
  const dbRef = ref(getDatabase(), "cars");
  const snapshot = await get(dbRef);

  // Transforma o objeto do firebase em uma lista de carros
  if (snapshot.exists()) {
    const carsObject = snapshot.val();
    return Object.values(carsObject);
  }

  return [];
}

export async function addUserInitialCar(userId: string){
  const car = await getRandomCar();

  await addUserCar(userId, car.id);
  await setUserSelectedCar(userId, car.id);
}
