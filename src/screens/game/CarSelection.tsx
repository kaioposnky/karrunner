import { CarSelectList } from '@/components/car/CarSelectList';
import { ThemedButton } from '@/components/themed/ThemedButton';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { getAllCars, setUserSelectedCar } from '@/service/car';
import { Car } from '@/types/Car';
import { RootNavigationList } from '@/types/RootNavigationList';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';

export const CarSelection = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const { user, isLoading } = useAuth();
  const [selectedCar, setSelectedCar] = useState(user?.selectedCar ?? null);
  const navigation = useNavigation<StackNavigationProp<RootNavigationList>>();

  const goToLogin = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthNavigation' }],
      })
    );
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
      goToLogin();
      return;
    }

    if(user !== null){
      setSelectedCar(user.selectedCar);
    }
  }, [goToLogin, isLoading, navigation, user]);

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
    >
      <ThemedText variant='title' className={"text-4xl mt-20 mb-12"}>
        Selecione seu carro
      </ThemedText>
      <CarSelectList
        carList={allCars}
        userCars={user?.cars ?? []}
        selectedCar={selectedCar}
        onCarSelect={handleCarSelect}
      >
      </CarSelectList>
      <ThemedButton
        title={'Voltar'}
        onPress={goToLogin}
        variant='primary'
        className='mb-8 mt-2'
      />
    </ThemedView>
  );
};
