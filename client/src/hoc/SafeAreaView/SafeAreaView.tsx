import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../../constants/colors';

interface SafeAreaViewProps extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  bottomStyle?: StyleProp<ViewStyle>;
}

export const SafeAreaView: FunctionComponent<SafeAreaViewProps> = ({ containerStyle, bottomStyle, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        containerStyle,
      ]}
    >
      {children}
      <View
        style={[
          styles.bottom,
          {
            paddingBottom: insets.bottom,
          },
          bottomStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bottom: {
    backgroundColor: COLORS.white,
  },
});
