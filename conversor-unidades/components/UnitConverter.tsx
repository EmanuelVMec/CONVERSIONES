// components/UnitConverter.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { units } from '../constants/units';
import Icon from 'react-native-vector-icons/Ionicons';

type UnitCategory = keyof typeof units;

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [value, setValue] = useState('1');
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal

  const unitList = Object.keys(units[category].units);

  const result = useMemo(() => {
    const input = parseFloat(value);
    if (isNaN(input)) return '';

    if (category === 'temperature') {
      // Conversión de temperatura
      if (fromUnit === toUnit) return value;

      if (fromUnit === 'C') {
        return toUnit === 'F'
          ? ((input * 9) / 5 + 32).toFixed(2)
          : (input + 273.15).toFixed(2);
      } else if (fromUnit === 'F') {
        return toUnit === 'C'
          ? (((input - 32) * 5) / 9).toFixed(2)
          : ((((input - 32) * 5) / 9) + 273.15).toFixed(2);
      } else {
        return toUnit === 'C'
          ? (input - 273.15).toFixed(2)
          : (((input - 273.15) * 9) / 5 + 32).toFixed(2);
      }
    } else {
      const base = input * (units[category].units as any)[fromUnit];
      const converted = base / (units[category].units as any)[toUnit];
      return converted.toFixed(4);
    }
  }, [value, fromUnit, toUnit, category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de {units[category].name}</Text>

      {/* Botón de Info */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="information-circle" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal de Información */}
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
                ¡Es ideal para situaciones cotidianas y profesionales!
              </Text>
            </View>

            <View style={styles.modalContent}>
              <Icon name="ios-speedometer" size={30} color="#FF5722" />
              <Text style={styles.modalText}>
                Las categorías incluyen: Longitud, Velocidad, Área, Volumen, Energía, Tiempo y Temperatura.
              </Text>
            </View>

            <View style={styles.modalContent}>
              <Icon name="ios-analytics" size={30} color="#3F51B5" />
              <Text style={styles.modalText}>
                Perfecta para tiendas, profesionales o cualquier persona que necesite hacer conversiones rápidas en su día a día.
              </Text>
            </View>

            {/* Botón de cierre del modal */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Selector de categoría */}
      <Picker selectedValue={category} onValueChange={(v) => {
        setCategory(v);
        const u = Object.keys(units[v].units);
        setFromUnit(u[0]);
        setToUnit(u[1] || u[0]);
      }}>
        {Object.keys(units).map((k) => (
          <Picker.Item key={k} label={units[k as UnitCategory].name} value={k} />
        ))}
      </Picker>

      {/* Entrada de valor */}
      <TextInput
        style={styles.input}
        value={value}
        keyboardType="numeric"
        onChangeText={setValue}
        placeholder="Cantidad"
      />

      {/* Selector de unidad de origen */}
      <Picker selectedValue={fromUnit} onValueChange={setFromUnit}>
        {unitList.map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker>

      {/* Selector de unidad de destino */}
      <Picker selectedValue={toUnit} onValueChange={setToUnit}>
        {unitList.map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker>

      {/* Resultado de la conversión */}
      <Text style={styles.result}>
        Resultado: {result} {toUnit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    flexWrap: 'wrap',
  },
  closeButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
  },
});
