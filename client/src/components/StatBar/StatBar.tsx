import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

interface StatBarProps {
  name: string;
  value: number;
}

const StatBar: React.FC<StatBarProps> = ({ name, value }) => {
  const maxValue = name === 'total' ? 800 : 150;
  const barWidthAnim = useRef(new Animated.Value(0)).current;

  const barWidth = (value / maxValue) * 100;

  useEffect(() => {
    Animated.timing(barWidthAnim, {
      toValue: barWidth,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [barWidth, barWidthAnim]);

  return (
    <View style={styles.statRow}>
      <Text style={[styles.statName, { color: COLORS.black + COLORS['0.6'] }]}>{name}</Text>
      <View style={styles.statBarContainer}>
        <Animated.View
          style={[
            styles.statBar,
            {
              width: barWidthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: value > maxValue / 2 ? COLORS.grass : COLORS.fire,
            },
          ]}
        />
      </View>
      <Text style={[styles.statValue, { color: COLORS.black + COLORS['0.6'] }]}>{value}</Text>
    </View>
  );
};

export default StatBar;

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statName: {
    flex: 1,
    fontSize: 16,
  },
  statBarContainer: {
    flex: 3,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  statBar: {
    height: '100%',
    borderRadius: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
