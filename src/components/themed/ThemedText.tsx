import React, { FC } from 'react';
import {Text, TextProps } from 'react-native';
import {useTheme} from '@/hooks/useTheme';

interface IThemeTextProps extends TextProps{
  variant: undefined | 'default' | 'title' | 'subtitle' | 'caption',
}

const variantStyles = {
  default: 'text-base',
  title: 'text-2xl font-bold',
  subtitle: 'text-md',
  caption: 'text-sm'
}

export const ThemedText: FC<IThemeTextProps> = ({
  variant, children, className, ...props
                                                }) => {
  const {theme} = useTheme();

  variant ??= 'default';
  const textColor = theme === "dark"? "text-text-dark" : "text-text-light";

  return (
    <Text
      className={`${variantStyles[variant]} ${textColor} ${className}`}
      {...props}
      >
        {children}
    </Text>
  );
};