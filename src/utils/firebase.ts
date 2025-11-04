import { Rarity } from '@/types/Rarity';
import { get, getDatabase, ref, set, push } from 'firebase/database';

export async function createTables(): Promise<void> {
  const db = getDatabase();

  const scoresRef = ref(db, 'scores');
  const scoresSnapshot = await get(scoresRef);
  if (!scoresSnapshot.exists()) {
    await set(scoresRef, {});
  }

  const pointsRef = ref(db, 'points');
  const pointsSnapshot = await get(pointsRef);
  if (!pointsSnapshot.exists()) {
    await set(pointsRef, {});
  }

  const carsRef = ref(db, 'cars');
  const carsSnapshot = await get(carsRef);
  if (!carsSnapshot.exists()) {
    await createCars();
  }

  const usersRef = ref(db, 'users');
  const usersSnapshot = await get(usersRef);
  if (!usersSnapshot.exists()) {
    await set(usersRef, {});
  }
}

export async function createCars(): Promise<void> {
  const db = getDatabase();
  const carsRef = ref(db, 'cars'); // Reference to the list of cars

  const carsToCreate: { name: string, rarity: Rarity, images: { select: string, run: string }}[] = [
    { name: 'Peugeuot 206', rarity: 'common', images: { select: "https://i.postimg.cc/nLvXCJK8/peugeot-206.png", run: ""} },
    { name: 'Fiesta', rarity: 'common', images: { select: "https://i.postimg.cc/YS1vhH6n/fiesta.png", run: ""} },
    { name: 'HB20S', rarity: 'common', images: { select: "https://i.postimg.cc/zfnyVrCQ/hb20s.png", run: ""} },
    { name: 'Nivus', rarity: 'common', images: { select: "https://i.postimg.cc/XvwrpbfR/nivus.png", run: ""} },
    { name: 'Polo', rarity: 'rare', images: { select: "https://i.postimg.cc/qRSSY9Yd/polo.png", run: ""} },
    { name: 'Fusca Vermelho', rarity: 'rare', images: { select: "https://i.postimg.cc/6Qd8yXrY/fusca-vermelho.png", run: ""} },
    { name: 'Virtus', rarity: 'rare', images: { select: "https://i.postimg.cc/5NYNXJ1q/virtus.png", run: ""} },
    { name: 'Fiesta Bom', rarity: 'rare', images: { select: "https://i.postimg.cc/TP8ydwDZ/fiesta-bom.png", run: ""} },
    { name: 'HRV', rarity: 'epic', images: { select: "https://i.postimg.cc/LszJnptw/hrv.png", run: ""} },
    { name: 'Tiggo 5', rarity: 'epic', images: { select: "https://i.postimg.cc/jjzDLb60/tiggo.png", run: ""} },
    { name: 'Fusca Branco', rarity: 'legendary', images: { select: "https://i.postimg.cc/8Ch7jSRw/fusca-branco.png", run: ""} },
    { name: 'Uno', rarity: 'legendary', images: { select: "https://i.postimg.cc/GtNLX7PG/uno.png", run: ""} },
  ];

  for (const carData of carsToCreate) {
    const newCarRef = push(carsRef);

    // Obter o id do carro para deixar salvo
    const firebaseId = newCarRef.key;

    const carWithId = {
      id: firebaseId!,
      name: carData.name,
      rarity: carData.rarity,
      images: carData.images
    };

    await set(newCarRef, carWithId);
  }
}
