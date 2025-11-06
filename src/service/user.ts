import { User } from '@/types/User';
import { get, getDatabase, ref, update } from 'firebase/database';
import { getCarById } from './car';
import { Car } from '@/types/Car';

export interface UserProfileFromDB {
  uid: string;
  displayName: string;
  email: string;
  cars?: { [id: string]: boolean };
  selectedCar?: string;
  balance: number;
}

export async function getUserProfile(userId: string): Promise<User | null> {
  const dbRef = ref(getDatabase(), `users/${userId}`);
  const snapshot = await get(dbRef);

  if (!snapshot.exists()) {
    return null;
  }

  const dbProfile = snapshot.val() as UserProfileFromDB;

  return await userProfileToUser(dbProfile);
}

export async function increaseUserBalance(userId: string, amount: number) {
  const dbRef = ref(getDatabase(), `users/${userId}`);
  const snapshot = await get(dbRef);
  if (!snapshot.exists()) return;

  const currentBalance = snapshot.val().balance || 0;
  const newBalance = currentBalance + amount;
  await update(dbRef, { balance: newBalance });
}

export async function decreaseUserBalance(userId: string, amount: number) {
  const dbRef = ref(getDatabase(), `users/${userId}`);
  const snapshot = await get(dbRef);
  if (!snapshot.exists()) return;

  const currentBalance = snapshot.val().balance || 0;
  const newBalance = currentBalance - amount;
  await update(dbRef, { balance: newBalance });
}

export function getUserRef(userId: string){
  const dbRef = ref(getDatabase(), `users/${userId}`);
  return dbRef;
}

export async function userProfileToUser(userProfile: UserProfileFromDB): Promise<User> {

  // Pega todos os carros que o usuário possui
  let ownedCars: Car[] = [];
  if (userProfile.cars) {
    const carIds = Object.keys(userProfile.cars);
    const carPromises = carIds.map(id => getCarById(id));
    const results = await Promise.all(carPromises);
    ownedCars = results.filter((car): car is Car => car !== null);
  }

  // Pega o carro selecionado pelo usuário
  let selectedCar: Car | null = null;
  if (userProfile.selectedCar) {
    selectedCar = await getCarById(userProfile.selectedCar);
  }

  const user: User = {
    uid: userProfile.uid,
    displayName: userProfile.displayName,
    email: userProfile.email,
    cars: ownedCars,
    selectedCar: selectedCar,
    balance: userProfile.balance,
  };

  return user;
}
