// components/AnimatedBackground.tsx
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function AnimatedBackground() {
  return (
    <>
      {[...Array(8).keys()].map((i) => (
        <FloatingCircle key={i} index={i} />
      ))}
    </>
  );
}

function FloatingCircle({ index }: { index: number }) {
  const position = useSharedValue(0);

  React.useEffect(() => {
    position.value = withRepeat(
      withTiming(-50, { duration: 4000 + index * 4000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value }],
    };
  });

  const size = Math.random() * 77 + 60;
  const left = Math.random() * width;
  const top = Math.random() * height;
  const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98'];

  return (
    <Animated.View
      style={[
        styles.circle,
        animatedStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left,
          top,
          backgroundColor: colors[index % colors.length],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    opacity: 0.2,
  },
});
