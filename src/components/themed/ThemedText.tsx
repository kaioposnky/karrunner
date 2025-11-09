import React, { FC } from 'react';
import {Text, TextProps } from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import { themeConfig } from '@/config/theme.config';

interface IThemeTextProps extends TextProps{
  variant?: 'default' | 'title' | 'subtitle' | 'caption',
}

export const ThemedText: FC<IThemeTextProps> = ({
  variant, children, className = '', ...props
                                                }) => {
  const {theme} = useTheme();

  const textConfig = themeConfig.text;
  const textStyle = variant ? textConfig.variants[variant] : '';

  const hasColorClass = className.includes('text-');
  const textColor = hasColorClass ? '' : textConfig.colors[theme];

  return (
    <Text
      className={`${className} ${textColor} ${textStyle}`}
      {...props}
      >
        {children}
    </Text>
  );
};
