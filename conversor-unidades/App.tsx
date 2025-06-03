import React from 'react';
import { StyleSheet, View } from 'react-native';
import UnitConverter from './components/UnitConverter';
import AnimatedBackground from './components/AnimatedBackground';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2b5876', '#4e4376']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AnimatedBackground />
      <View style={styles.overlay}>
        <UnitConverter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
