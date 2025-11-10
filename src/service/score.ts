import { User } from '@/types/User';
import { UserScore } from '@/types/UserScore';
import { getDatabase, ref, set, get, child, orderByChild, query, limitToLast, update } from 'firebase/database';

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

      const scoresArray: UserScore[] = [];
      snapshot.forEach((childSnapshot) => {
        scoresArray.push({
          id: childSnapshot.key!,
          ...childSnapshot.val(),
        });
      });

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

export async function updatePlayerScore(userId: string, score: number): Promise<void> {
  const dbRef = ref(getDatabase(), 'scores/' + userId);
  await update(dbRef, { score: Math.round(score) });
}

export const tryUpdateUserScore = async (user: User, score: number) => {
  const userMaxScore = await getPlayerScore(user.uid);
  if(score > userMaxScore.score){
    await updatePlayerScore(user.uid, score);
  }
}
