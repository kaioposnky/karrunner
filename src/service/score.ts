import { UserScore } from '@/types/UserScore';
import { getDatabase, ref, set, get, child, orderByChild, query, limitToLast } from 'firebase/database';

export async function createPlayerScore(
  userId: string,
  name: string,
  email: string
): Promise<void> {
  const db = getDatabase();
  await set(ref(db, 'scores/' + userId), {
    username: name,
    email: email,
    score: 0,
  });
}

export async function getPlayerScore(userId: string): Promise<UserScore> {
  const dbRef = ref(getDatabase());
  const userScore: UserScore = await get(child(dbRef, 'scores/' + userId))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error('Pontuação não encontrada!');
      }
      return snapshot.val();
    })
    .catch((error: any) => {
      let errorMessage = 'Ocorreu um erro ao obter os pontos do jogador!';
      if (error.message.includes('PERMISSION_DENIED')) {
        errorMessage = 'Você não tem permissão para acessar os pontos do jogador.';
      }
      throw new Error(errorMessage);
    });
  return userScore;
}

export async function getAllScores(limit?: number): Promise<UserScore[]> {
  const dbRef = ref(getDatabase(), 'scores');

  let scoresQuery;
  if (limit) {
    scoresQuery = query(dbRef, orderByChild('score'), limitToLast(limit));
  } else {
    scoresQuery = query(dbRef, orderByChild('score'));
  }

  const scores: UserScore[] = await get(scoresQuery)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        return [];
      }
      const scoresData = snapshot.val();
      // Convert the object of scores into an array
      const scoresArray = Object.keys(scoresData).map((key) => ({
        id: key,
        ...scoresData[key],
      }));
      return scoresArray.reverse();
    })
    .catch((error: any) => {
      console.error(error);
      let errorMessage = 'Ocorreu um erro ao obter as pontuações!';
      if (error.message.includes('PERMISSION_DENIED')) {
        errorMessage = 'Você não tem permissão para acessar as pontuações.';
      }
      throw new Error(errorMessage);
    });
  return scores;
}
