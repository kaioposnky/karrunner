import { ThemedView } from '@/components/themed/ThemedView';
import { Header } from '@/components/header/Header';
import { AuthNavigation } from '@/navigation/AuthNavigation';
import { GameNavigation } from '@/navigation/GameNavigation';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStackNavigation = "AuthNavigation";
const GameStackNavigation = "GameNavigation";

export const MainScreen = () => {
    
  return (
    <ThemedView 
      center="both"
    >
      <Header/>
    </ThemedView>
  );
};
