import { ThemedButton } from "@/components/themed/ThemedButton";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { getAllScores } from "@/service/score";
import { UserScore } from "@/types/UserScore";
import { useEffect, useState } from "react";

export const LeaderBoardScreen = () => {
  const [userScores, setUserScores] = useState<UserScore[]>([]);
  const [limit, setLimit] = useState<number>(10);
  
  useEffect(() => {
    
    async function getUserScores(){
      try{
        const users = await getAllScores(limit);
        setUserScores(users);
      } catch(error) {
        console.error(error);
      }
    }
    
    getUserScores();
  }, [limit]);
  
  const handleLoadMore = () => {
    if (limit >= 50) return;
    setLimit(prev => prev + 5);
  };
  
  return (
    <ThemedView
      center="both"
    >
      <ThemedButton
      title="Carregar Mais"
      onPress={handleLoadMore}
      />
      
      <ThemedText>
        LeaderBoard {limit} melhores pontuações
      </ThemedText>
      <ThemedView
        className="rounded-lg bg-yellow-200 gap-4"
      >
        <ThemedView 
          className="p-4"
        >
          <ThemedText>
            Usuário   Pontuação
          </ThemedText>
        </ThemedView>
        {userScores.map((userScore) => (
          <ThemedView 
            key={userScore.id}
            className="p-4"
          >
            <ThemedText>
              {userScore.username} - {userScore.score}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
      
    </ThemedView>
  );
};