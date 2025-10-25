import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { themeConfig } from '../../theme.config';

interface IThemeButtonProps extends TouchableOpacityProps {
  size?: 'small' | 'medium' | 'large';
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
  const txtConfig = themeConfig.text;
  const buttonStyle = btnConfig.variants[variant][theme];
  const textStyle = txtConfig.variants[variant];
  const sizeStyle = btnConfig.sizes[size];
  const borderStyle = btnConfig.borders[border];

  return (
    <TouchableOpacity
      className={`${btnConfig.base} ${buttonStyle} ${sizeStyle} ${borderStyle} ${className}`}
      {...props}
    >
      <Text className={`text-center font-semibold ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};