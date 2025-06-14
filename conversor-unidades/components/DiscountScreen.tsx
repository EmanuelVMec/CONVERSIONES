// components/DiscountScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from './AnimatedBackground';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DiscountScreen() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const calculateDiscount = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!isNaN(p) && !isNaN(d)) {
      const discounted = p - (p * d) / 100;
      setFinalPrice(parseFloat(discounted.toFixed(2)));
    } else {
      setFinalPrice(null);
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

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>
          <Icon name="pricetag" size={24} color="#fff" /> Calculadora de Descuento
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Precio original"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Porcentaje de descuento (%)"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={discount}
          onChangeText={setDiscount}
        />

        <TouchableOpacity style={styles.button} onPress={calculateDiscount}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {finalPrice !== null && (
          <Text style={styles.result}>
            Precio final: ${finalPrice}
          </Text>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    margin: 20,
    padding: 24,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#00BCD4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  result: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
