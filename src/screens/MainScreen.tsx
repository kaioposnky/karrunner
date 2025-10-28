import { ThemedView } from '@/components/themed/ThemedView';
import { Header } from '@/components/header/Header';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemedButton } from '@/components/themed/ThemedButton';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationList } from '@/types/RootNavigationList';
import Toast from 'react-native-toast-message';

export const MainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootNavigationList>>();

  return (
    <ThemedView 
      center="both"
      className={'flex items-center'}
    >
      <Header />
      <ThemedButton
        title="Jogar"
        size="2xl"
        onPress={() => 
          navigation.navigate('AuthNavigation')
        }
        className={'mt-20'}
      />
    </ThemedView>
  );
};
