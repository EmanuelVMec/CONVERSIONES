import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from './AnimatedBackground';
import { units } from '../constants/units';

type UnitCategory = keyof typeof units;

export default function UnitConverter() {
  const route = useRoute();
  const routeCategory = (route.params as any)?.category;
  const fallbackCategory: UnitCategory = 'length';
  const isValidCategory = routeCategory && routeCategory in units;

  const [category] = useState<UnitCategory>(
    isValidCategory ? routeCategory : fallbackCategory
  );
  const [fromUnit, setFromUnit] = useState(
    Object.keys(units[category].units)[0]
  );
  const [toUnit, setToUnit] = useState(
    Object.keys(units[category].units)[1] || Object.keys(units[category].units)[0]
  );
  const [value, setValue] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);

  const unitList = Object.keys(units[category].units);

  const result = useMemo(() => {
    const input = parseFloat(value);
    if (isNaN(input)) return '';

    const roundSmart = (num: number) => {
      if (num >= 1) return parseFloat(num.toFixed(4));
      if (num >= 0.01) return parseFloat(num.toFixed(6));
      return parseFloat(num.toPrecision(2));
    };

    if (category === 'temperature') {
      if (fromUnit === toUnit) return value;

      let tempResult = 0;

      if (fromUnit === 'C') {
        tempResult = toUnit === 'F'
          ? (input * 9) / 5 + 32
          : input + 273.15;
      } else if (fromUnit === 'F') {
        tempResult = toUnit === 'C'
          ? ((input - 32) * 5) / 9
          : ((input - 32) * 5) / 9 + 273.15;
      } else {
        tempResult = toUnit === 'C'
          ? input - 273.15
          : ((input - 273.15) * 9) / 5 + 32;
      }

      return roundSmart(tempResult).toString();
    }

    const fromValue = (units[category].units as any)[fromUnit];
    const toValue = (units[category].units as any)[toUnit];

    if (!fromValue || !toValue) return '';

    const base = input * fromValue;
    const converted = base / toValue;

    return roundSmart(converted).toString();
  }, [value, fromUnit, toUnit, category]);

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
        <View style={styles.header}>
          <Text style={styles.title}>Conversor de {units[category].name}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="information-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Información de la Aplicación</Text>
              <View style={styles.modalContent}>
                <Icon name="ios-pulse" size={30} color="#4CAF50" />
                <Text style={styles.modalText}>
                  Esta aplicación te permite realizar conversiones entre diferentes unidades de medida.
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Icon name="ios-speedometer" size={30} color="#FF5722" />
                <Text style={styles.modalText}>
                  Las categorías incluyen: Longitud, Velocidad, Área, Volumen, Energía, Tiempo, Temperatura, Masa, y más.
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Icon name="ios-analytics" size={30} color="#3F51B5" />
                <Text style={styles.modalText}>
                  Ideal para estudiantes, profesionales o cualquier persona que necesite hacer conversiones rápidas.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TextInput
          style={styles.input}
          value={value}
          keyboardType="numeric"
          onChangeText={setValue}
          placeholder="Cantidad"
          placeholderTextColor="#ccc"
        />

        <Picker selectedValue={fromUnit} onValueChange={setFromUnit} style={styles.picker}>
          {unitList.map((u) => (
            <Picker.Item key={u} label={u} value={u} />
          ))}
        </Picker>

<Text style={styles.label}>Convertir a:</Text>

        <Picker selectedValue={toUnit} onValueChange={setToUnit} style={styles.picker}>
          {unitList.map((u) => (
            <Picker.Item key={u} label={u} value={u} />
          ))}
        </Picker>

        <Text style={styles.result}>
          Resultado: {result} {toUnit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  label: {
  textAlign: 'center',
  marginVertical: 8,
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
},
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  picker: {
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    marginBottom: 12,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  closeButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});
