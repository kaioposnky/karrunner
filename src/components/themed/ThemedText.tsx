import React, { FC } from 'react';
import {Text, TextProps } from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import { themeConfig } from '@/config/theme.config';

interface IThemeTextProps extends TextProps{
  variant?: 'default' | 'title' | 'subtitle' | 'caption',
  customColor?: string;
}

export const ThemedText: FC<IThemeTextProps> = ({
  variant, children, className = '', customColor = '', ...props
                                                }) => {
  const {theme} = useTheme();

  const textConfig = themeConfig.text;
  const textStyle = variant ? textConfig.variants[variant] : '';

  const textColor = customColor || textConfig.colors[theme];

  return (
    <Text
      className={`${className} ${textColor} ${textStyle}`}
      {...props}
      >
        {children}
    </Text>
  );
};
