import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

export const toastConfig = {
  success: (props : ToastProps) => (
    <BaseToast
      text1='Sucesso!'
      {...props}
      style={{ borderLeftColor: 'green', height: 'auto', minHeight: 60, paddingVertical: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 25,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 20,
      }}
      text2NumberOfLines={5}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      text1='Erro!'
      {...props}
      style={{ borderLeftColor: 'red', height: 'auto', minHeight: 60, paddingVertical: 10 }}
      text1Style={{
        fontSize: 25
      }}
      text2Style={{
        fontSize: 20
      }}
      text2NumberOfLines={5}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      text1='Info!'
      {...props}
      style={{ borderLeftColor: 'blue', height: 'auto', minHeight: 60, paddingVertical: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 25,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 20,
      }}
      text2NumberOfLines={5}
    />
  ),
};
