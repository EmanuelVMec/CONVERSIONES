import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from './AnimatedBackground';

export default function AgeScreen() {
  const [birthYear, setBirthYear] = useState('');
  const [age, setAge] = useState('');

  const calculateAge = () => {
    const year = parseInt(birthYear);
    if (!isNaN(year)) {
      const currentYear = new Date().getFullYear();
      setAge((currentYear - year).toString());
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
        <Text style={styles.title}>Calculadora de Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Año de nacimiento"
          keyboardType="numeric"
          value={birthYear}
          onChangeText={setBirthYear}
        />
        <TouchableOpacity onPress={calculateAge} style={styles.button}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        {age !== '' && <Text style={styles.result}>Tienes {age} años</Text>}
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
    backgroundColor: '#FF4081',
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
