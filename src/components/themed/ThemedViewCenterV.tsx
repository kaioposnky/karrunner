import React, { FC } from 'react';
import { View, Text } from 'react-native';

interface IThemeViewCenterVProps {
  children: React.ReactNode;
  className: string;
}

export const ThemedViewCenterV: FC<IThemeViewCenterVProps> = (props) => {
  const classNameAttributes = `flex justify-center ${props.className}`;

  return (
    <View className={classNameAttributes}>
      {props.children}
    </View>
  );
};