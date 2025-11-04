import { Car } from "@/types/Car";
import { ThemedView } from "../themed/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import { CarSelectItem } from "./CarSelectItem";
import { FlatList, Pressable, View } from "react-native";

interface CarSelectListProps {
  carList: Car[];
  userCars: Car[];
  selectedCar: Car | null;
  onCarSelect: (car: Car) => void;
}

export const CarSelectList = ({ carList, userCars, selectedCar, onCarSelect }: CarSelectListProps) => {
  const { theme } = useTheme();

  const unlockedCarIds : string[] = useMemo(() => {
    return userCars.map((car) => car.id);
  }, [userCars])

  return (
    <FlatList
      data={carList}
      keyExtractor={(item) => item.id}
      className="w-full mt-4 px-4"
      numColumns={3}
      extraData={selectedCar}
      renderItem={({ item }) => {

        const unlocked = unlockedCarIds.includes(item.id);
        const selected = selectedCar?.id === item.id;

        const borderColor = selected ? '#D97706' : (theme === 'dark' ? '#4A5568' : '#E2E8F0');

        return (
          <Pressable 
            onPress={() => unlocked && onCarSelect(item)} 
            disabled={!unlocked}
            style={{ flex: 1, margin: 4 }}
          >
            <View
              style={{
                borderRadius: 8,
                borderWidth: 2,
                borderColor: borderColor,
                overflow: 'hidden',
              }}
            >
              <CarSelectItem
                car={item}
                unlocked={unlocked}
                selected={selected}
              />
              {/*Overlay do carro quando ele está bloqueado*/}
              {!unlocked &&
                <ThemedView
                  className="absolute top-0 bottom-0 left-0 right-0 bg-gray-800/80 rounded-lg flex justify-center items-center"
                />
              }
            </View>
          </Pressable>
        );
      }}
      ItemSeparatorComponent={() => <ThemedView style={{ height: 10 }} />}
      contentContainerStyle={{ paddingVertical: 20 }}
    />
  )
}
