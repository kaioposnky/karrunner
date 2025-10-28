import React, { FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { themeConfig } from '@/config/theme.config';

interface IThemedInputProps extends TextInputProps {
  className?: string;
}

export const ThemedInput: FC<IThemedInputProps> = ({ className = '', ...props }) => {
  const { theme } = useTheme();

  const inputConfig = themeConfig.input;
  const inputStyle = inputConfig.style[theme];
  const placeholderTextColor = inputConfig.placeholder[theme];

  return (
    <TextInput
      className={`${className} ${inputStyle}`}
      placeholderTextColor={placeholderTextColor}
      {...props}
    />
  );
};
