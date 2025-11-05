import { CarSelectList } from '@/components/car/CarSelectList';
import { ThemedButton } from '@/components/themed/ThemedButton';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { getAllCars, setUserSelectedCar } from '@/service/car';
import { Car } from '@/types/Car';
import { RootNavigationList } from '@/types/RootNavigationList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';

export const CarSelection = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const { user, isLoading } = useAuth();
  const [selectedCar, setSelectedCar] = useState(user?.selectedCar ?? null);
  const navigation = useNavigation<StackNavigationProp<RootNavigationList>>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getAllCars();
      setAllCars(cars);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if(!isLoading && !user){
      goBack();
      return;
    }

    if(user !== null){
      setSelectedCar(user.selectedCar);
    }
  }, [goBack, isLoading, navigation, user]);

  useEffect(() => {
    if(!isLoading){
      if(user !== null){
        setSelectedCar(user.selectedCar);
      }
    }
  }, [isLoading, user]);

  const handleCarSelect = (car: Car) => {
    if (!user) return;
    if(car === user.selectedCar) return;
    setSelectedCar(car);
    setUserSelectedCar(user.uid, car.id);
  };

  if (isLoading || !user) {
    return (
      <ThemedView
        center='both'
      >
        <ThemedText
          variant='title'
        >
          Carregando...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      center='horizontal'
      className='flex-1'
    >
      <ThemedText variant='title' className={"text-4xl mt-20 mb-12"}>
        Selecione seu carro
      </ThemedText>
      <CarSelectList
        carList={allCars}
        userCars={user?.cars ?? []}
        selectedCar={selectedCar}
        onCarSelect={handleCarSelect}
      />
      <ThemedButton
        title={'Voltar'}
        onPress={goBack}
        variant='primary'
        className='mb-8 mt-2'
      />
    </ThemedView>
  );
};
