import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from './AnimatedBackground';

export default function BmiScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      const bmi = w / (h * h);
      setResult(bmi.toFixed(2));
    } else {
      setResult('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#4b0082', '#000000', '#00bcd4']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1.3 }}
      />
      <AnimatedBackground />

      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de IMC</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TouchableOpacity onPress={calculateBMI} style={styles.button}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {result !== '' && (
          <Text style={styles.result}>Tu IMC es: {result}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: 'transparent' },
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.2,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  input: {
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#8BC34A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  result: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});