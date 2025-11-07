import { checkUserHasCar, addUserCar } from "@/service/car";
import { increaseUserBalance, decreaseUserBalance } from "@/service/user";
import { Car } from "@/types/Car";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import Toaster from "react-native-toast-message";

export const useCarSpin = (user: User | null, isLoading: boolean) => {
  const [shouldSpin, setShouldSpin] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const SPIN_COST = 1000;
  const REFUND_AMOUNT = SPIN_COST * 0.8;

  useEffect(() => {
    if (user) {
      setBalance(user.balance ?? 0);
    }
  }, [user]);

  const handleSpinStart = () => {
    setIsSpinning(true);
    setSelectedCar(null);
  };

  const handleSpinEnd = (car: Car) => {
    setSelectedCar(car);
    setShouldSpin(false);
    setIsSpinning(false);
    if (user) {
      checkUserHasCar(user.uid, car.id).then(
        (hasCar) => {

          // Se o usuário não possui o carro, adiciona o carro para o usuário
          if (!hasCar) {
            addUserCar(user.uid, car.id).then(() => {
              Toaster.show({
                type: 'success',
                text1: 'Carro Novo!',
                text2: `Seu carro novo foi adicionado à sua coleção!`
              });
            });
          }

          // Se o usuário já possui o carro, ele recebe uma porcentagem de volta
          else {
            increaseUserBalance(user.uid, REFUND_AMOUNT).then(() => {
              setBalance((b) => b + REFUND_AMOUNT);
              Toaster.show({
                type: 'info',
                text1: 'Carro já desbloqueado!',
                text2: `Você recebeu ${REFUND_AMOUNT} como compensação.`
              });
            }).catch((error) => {
              console.error('Erro ao atualizar saldo:', error);
              Toaster.show({
                type: 'error',
                text1: 'Erro ao atualizar saldo',
                text2: 'Tente novamente mais tarde'
              });
            });
          }
        }
      );
    }
  };

  const handleRedeem = () => {
    setSelectedCar(null);
  };

  const spinReel = () => {
    if (!shouldSpin && !isLoading && user) {
      if(balance < SPIN_COST){
        Toaster.show({
          type: 'error',
          text1: 'Saldo insuficiente',
          text2: `Você precisa ter pelo menos $${SPIN_COST} para jogar!`
        });
        return;
      }

      decreaseUserBalance(user.uid, SPIN_COST).then(() => {
        setBalance((b) => b - SPIN_COST);
        setIsSpinning(true);
        setShouldSpin(true);
        Toaster.show({
          type: 'success',
          text1: 'Roleta iniciada!',
          text2: `Foi deduzido $${SPIN_COST} do seu saldo.`
        });
      });
    }
  };

  return {
    shouldSpin,
    selectedCar,
    isSpinning,
    handleSpinStart,
    handleSpinEnd,
    handleRedeem,
    spinReel,
    SPIN_COST,
    balance,
  }
}
