import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { themeConfig } from '@/config/theme.config';

interface IThemeButtonProps extends TouchableOpacityProps {
  size?: 'small' | 'medium' | 'large' | 'xl' | '2xl';
  variant?: 'primary' | 'secondary' | 'outline';
  border?: 'roundy' | 'round';
  className?: string;
  title: string;
}

export const ThemedButton: FC<IThemeButtonProps> = ({
  className = '',
  title,
  size = 'medium',
  variant = 'primary',
  border = 'round',
  ...props
}) => {
  const { theme } = useTheme();
  const btnConfig = themeConfig.button;
  const buttonStyle = btnConfig.variants[variant][theme];
  const textStyle = btnConfig.text[variant][theme];
  const sizeStyle = btnConfig.sizes[size];
  const borderStyle = btnConfig.borders[border];
  const fontSizeStyle = (btnConfig as any).fontSizes[size];

  return (
    <TouchableOpacity
      className={`${btnConfig.base} ${buttonStyle} ${sizeStyle} ${borderStyle} ${className}`}
      {...props}>
      <Text className={`text-center font-semibold ${textStyle} ${fontSizeStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};
