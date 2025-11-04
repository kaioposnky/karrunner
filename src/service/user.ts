import { User } from '@/types/User';
import { get, getDatabase, ref } from 'firebase/database';
import { getCarById } from './car';
import { Car } from '@/types/Car';

interface UserProfileFromDB {
  uid: string;
  displayName: string;
  email: string;
  cars?: { [id: string]: boolean };
  selectedCarId?: string;
}

export async function getUserProfile(userId: string): Promise<User | null> {
  const dbRef = ref(getDatabase(), `users/${userId}`);
  const snapshot = await get(dbRef);

  if (!snapshot.exists()) {
    return null;
  }

  const dbProfile = snapshot.val() as UserProfileFromDB;

  // Pega todos os carros que o usuário possui
  let ownedCars: Car[] = [];
  if (dbProfile.cars) {
    const carIds = Object.keys(dbProfile.cars);
    const carPromises = carIds.map(id => getCarById(id));
    const results = await Promise.all(carPromises);
    ownedCars = results.filter((car): car is Car => car !== null);
  }

  // Pega o carro selecionado pelo usuário
  let selectedCar: Car | null = null;
  if (dbProfile.selectedCarId) {
    selectedCar = await getCarById(dbProfile.selectedCarId);
  }

  const user: User = {
    uid: dbProfile.uid,
    displayName: dbProfile.displayName,
    email: dbProfile.email,
    cars: ownedCars,
    selectedCar: selectedCar,
  };

  return user;
}
