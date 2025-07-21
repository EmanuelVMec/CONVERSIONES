import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from './AnimatedBackground';

export default function BmiScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');
  const [classification, setClassification] = useState('');
  const [color, setColor] = useState('#fff');
  const [showInfo, setShowInfo] = useState(false);

  const handleInput = (text, setter) => {
    const cleaned = text.replace(/[^0-9]/g, ''); // Solo números
    setter(cleaned);
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      const bmi = w / (h * h);
      const rounded = bmi.toFixed(2);
      setResult(rounded);
      classifyBMI(bmi);
    } else {
      setResult('');
      setClassification('');
    }
  };

  const classifyBMI = (bmi) => {
    if (bmi < 18.5) {
      setClassification('Peso Bajo');
      setColor('#f7931e');
    } else if (bmi < 25) {
      setClassification('Peso Normal');
      setColor('#00bff3');
    } else if (bmi < 30) {
      setClassification('Sobrepeso');
      setColor('#ec008c');
    } else if (bmi < 35) {
      setClassification('Obesidad Leve');
      setColor('#ed1c24');
    } else if (bmi < 40) {
      setClassification('Obesidad Media');
      setColor('#39b54a');
    } else {
      setClassification('Obesidad Mórbida');
      setColor('#f15a29');
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => setShowInfo(!showInfo)}
            >
              <Text style={styles.helpText}>❓</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Calculadora de IMC</Text>

            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={(text) => handleInput(text, setWeight)}
            />
            <TextInput
              style={styles.input}
              placeholder="Altura (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={(text) => handleInput(text, setHeight)}
            />

            <TouchableOpacity onPress={calculateBMI} style={styles.button}>
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            {result !== '' && (
              <View style={styles.resultBox}>
                <Text style={styles.result}>Tu IMC es: {result}</Text>
                <View
                  style={[styles.classificationBox, { backgroundColor: color }]}
                >
                  <Text style={styles.classificationText}>{classification}</Text>
                </View>
              </View>
            )}

            {showInfo && (
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>¿Qué es el IMC?</Text>
                <Text style={styles.infoText}>
                  El Índice de Masa Corporal (IMC) evalúa tu peso con relación a tu altura. Se usa para determinar si tienes un peso saludable.
                </Text>

                <Text style={styles.infoTitle}>¿Cómo usar esta app?</Text>
                <Text style={styles.infoText}>
                  • Ingresa solo números (sin puntos ni comas).{"\n"}
                  • El peso debe estar en kilogramos (kg).{"\n"}
                  • La altura debe estar en centímetros (cm).{"\n"}
                  • No se permiten letras u otros símbolos.
                </Text>

                <Text style={styles.infoTitle}>Tabla IMC:</Text>
                <View style={styles.table}>
                  <Text style={[styles.row, { backgroundColor: '#f7931e' }]}>Menor a 18.49 → Peso Bajo</Text>
                  <Text style={[styles.row, { backgroundColor: '#00bff3' }]}>18.50 a 24.99 → Peso Normal</Text>
                  <Text style={[styles.row, { backgroundColor: '#ec008c' }]}>25.00 a 29.99 → Sobrepeso</Text>
                  <Text style={[styles.row, { backgroundColor: '#ed1c24' }]}>30.00 a 34.99 → Obesidad Leve</Text>
                  <Text style={[styles.row, { backgroundColor: '#39b54a' }]}>35.00 a 39.99 → Obesidad Media</Text>
                  <Text style={[styles.row, { backgroundColor: '#f15a29' }]}>Mayor a 40.00 → Obesidad Mórbida</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: 'transparent' },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
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
    backgroundColor: '#8BC34A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  result: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classificationBox: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  classificationText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff33',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  helpText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 15,
    color: '#ddd',
    marginBottom: 10,
    lineHeight: 22,
  },
  table: {
    marginTop: 6,
  },
  row: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 14,
  },
});
