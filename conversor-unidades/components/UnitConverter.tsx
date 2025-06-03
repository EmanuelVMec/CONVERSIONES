// components/UnitConverter.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { units } from '../constants/units';

type UnitCategory = keyof typeof units;

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [value, setValue] = useState('1');

  const unitList = Object.keys(units[category].units);

  const result = useMemo(() => {
    const input = parseFloat(value);
    if (isNaN(input)) return '';

    if (category === 'temperature') {
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

      <TextInput
        style={styles.input}
        value={value}
        keyboardType="numeric"
        onChangeText={setValue}
        placeholder="Cantidad"
      />

      <Picker
  selectedValue={fromUnit}
  onValueChange={setFromUnit}
  style={{ backgroundColor: '#ffffffcc', borderRadius: 10, marginBottom: 12 }}
>
  {unitList.map((u) => (
    <Picker.Item key={u} label={u} value={u} />
  ))}
</Picker>


      <Picker selectedValue={toUnit} onValueChange={setToUnit}>
        {unitList.map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker>

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
