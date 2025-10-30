import { ThemedButton } from '@/components/themed/ThemedButton';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { getAllScores } from '@/service/score';
import { UserScore } from '@/types/UserScore';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export const LeaderBoardScreen = () => {
  const [userScores, setUserScores] = useState<UserScore[]>([]);
  const [limit, setLimit] = useState<number>(10);
  
  const navigation = useNavigation();

  useEffect(() => {
    async function getUserScores() {
      try {
        const users = await getAllScores(limit);
        setUserScores(users);
      } catch (error) {
        console.error(error);
      }
    }

    getUserScores();
  }, [limit]);

  const handleLoadMore = () => {
    if (limit >= 50) return;
    if (userScores.length < limit) return;
    setLimit((prev) => prev + 5);
  };
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ThemedView className="flex-1 items-center justify-center p-4">
      <ThemedText variant="title" className="mb-6">
        Top {limit} Melhores Pontuações
      </ThemedText>

      <ThemedView className="w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
        {/* Nomes das colunas */}
        <ThemedView className="flex-row justify-between border-b border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-800">
          <ThemedText variant="subtitle" className="w-2/3 font-bold">
            Usuário
          </ThemedText>
          <ThemedText variant="subtitle" className="w-1/3 text-right font-bold">
            Pontuação
          </ThemedText>
        </ThemedView>

        {/* Scores dos usuários */}
        {userScores.map((userScore, index) => (
          <ThemedView
            key={userScore.id}
            className={`flex-row justify-between p-3 ${
              index < userScores.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
            }`}>
            <ThemedText className="w-2/3" numberOfLines={1} ellipsizeMode="tail">
              {userScore.username}
            </ThemedText>
            <ThemedText className="w-1/3 text-right">{userScore.score}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedButton title="Carregar Mais" onPress={handleLoadMore} className="mt-6" />
      <ThemedButton title="Voltar" onPress={goBack} className="mt-6" />
    </ThemedView>
  );
};
