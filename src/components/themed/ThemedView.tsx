import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { themeConfig } from '@/config/theme.config';
import { useTheme } from '@/hooks/useTheme';

interface IThemeViewCenterHProps extends ViewProps{
  center?: "horizontal" | "vertical" | "both";
  className?: string;
}

export const ThemedView: FC<IThemeViewCenterHProps> = ({
  center, children, className='', ...props
                                                       }) => {
  const {theme} = useTheme();

  const viewColor = themeConfig.view.background[theme];
  let centerClasses = '';
  if(center){
    if(center === "horizontal"){
      centerClasses = 'items-center';
    } else if(center === "vertical"){
      centerClasses = 'justify-center';
    } else if (center === "both"){
      centerClasses = 'justify-center items-center';
    }
    centerClasses = `flex-1 ${centerClasses}`;
  }

  return (
    <View
      className={`${className} ${viewColor} ${centerClasses}`}
      {...props}
    >
      {children}
    </View>
  );
};