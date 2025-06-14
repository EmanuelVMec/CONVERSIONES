import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import AnimatedBackground from './components/AnimatedBackground';
import HomeScreen from './components/HomeScreen';
import UnitConverter from './components/UnitConverter';
import CalculatorScreen from './components/CalculatorScreen';
import BmiScreen from './components/BmiScreen';
import AgeScreen from './components/AgeScreen';
import DiscountScreen from './components/DiscountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* Fondo degradado Glassmorphism */}
      <LinearGradient
        colors={['#2b5876', '#4e4376']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Navegación de pantallas */}
      <View style={styles.overlay}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UnitConverter" component={UnitConverter} />
            <Stack.Screen name="CalculatorScreen" component={CalculatorScreen} />
            <Stack.Screen name="BmiScreen" component={BmiScreen} />
            <Stack.Screen name="AgeScreen" component={AgeScreen} />
            <Stack.Screen name="DiscountScreen" component={DiscountScreen} />
          </Stack.Navigator>
        </NavigationContainer>
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
  },
});
