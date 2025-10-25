import React, { FC } from 'react';
import { View, Text } from 'react-native';

interface IThemeViewCenterHProps {
  children: React.ReactNode;
  className: string;
}

export const ThemedViewCenterH: FC<IThemeViewCenterHProps> = (props) => {
  
  const classNameAttributes = `flex items-center ${props.className}`;
  
  return (
    <View className={classNameAttributes}>
      {props.children}
    </View>
  );
};