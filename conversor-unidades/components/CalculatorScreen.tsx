import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from './AnimatedBackground';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CalculatorScreen() {
  const [input, setInput] = useState('');

  const handlePress = (val: string) => {
    if (val === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else if (val === 'C') {
      setInput('');
    } else {
      setInput((prev) => prev + val);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

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
        <Text style={styles.title}>Calculadora</Text>
        <TextInput style={styles.input} value={input} editable={false} />
        <View style={styles.buttonGrid}>
          {buttons.map((b) => (
            <TouchableOpacity key={b} style={styles.button} onPress={() => handlePress(b)}>
              <Text style={styles.buttonText}>{b}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, styles.clear]} onPress={() => handlePress('C')}>
            <Icon name="backspace-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    marginBottom: 12,
    color: '#000',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    margin: '1%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, color: '#fff' },
  clear: { backgroundColor: '#F44336' },
});
