import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

export const toastConfig = {
  success: (props : ToastProps) => (
    <BaseToast
      text1='Sucesso!'
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 25,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 20,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      text1='Erro!'
      {...props}
      text1Style={{
        fontSize: 25
      }}
      text2Style={{
        fontSize: 20
      }}
    />
  ),
};