import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedBackground from './AnimatedBackground';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  { key: 'length', name: 'Longitud', icon: 'map', color: '#4CAF50' },
  { key: 'area', name: 'Área', icon: 'expand', color: '#3F51B5' },
  { key: 'volume', name: 'Volumen', icon: 'cube', color: '#FF9800' },
  { key: 'temperature', name: 'Temperatura', icon: 'thermometer', color: '#03A9F4' },
  { key: 'speed', name: 'Velocidad', icon: 'speedometer', color: '#9C27B0' },
  { key: 'energy', name: 'Energía', icon: 'flash', color: '#F44336' },
  { key: 'time', name: 'Tiempo', icon: 'time', color: '#FF5722' },
  { key: 'mass', name: 'Masa', icon: 'scale', color: '#607D8B' },

  // Nuevas funcionalidades
  { key: 'pressure', name: 'Presión', icon: 'water', color: '#00BCD4' },
  { key: 'density', name: 'Densidad', icon: 'layers', color: '#9E9E9E' },
  { key: 'power', name: 'Potencia', icon: 'battery-charging', color: '#795548' },
  { key: 'fuel', name: 'Combustible', icon: 'car-sport', color: '#E91E63' },
  { key: 'data', name: 'Datos', icon: 'cloud-outline', color: '#3F51B5' },
  { key: 'currency', name: 'Moneda', icon: 'cash-outline', color: '#4CAF50' },
  { key: 'calculator', name: 'Calculadora', icon: 'calculator', color: '#FFC107' },
  { key: 'bmi', name: 'IMC', icon: 'fitness', color: '#8BC34A' },
  { key: 'age', name: 'Edad', icon: 'calendar', color: '#FF4081' },
  { key: 'discount', name: 'Descuento', icon: 'pricetag', color: '#00BCD4' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      {/* Fondo degradado */}
      <LinearGradient
        colors={['#4b0082', '#000000', '#00bcd4']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1.4 }}
      />

      {/* Fondo animado */}
      <AnimatedBackground />

      <View style={styles.container}>
        {/* Título con ícono */}
        <View style={styles.titleContainer}>
          <Icon name="grid" size={35} color="#fff" />
          <Text style={styles.title}>CONVERSIONES</Text>
        </View>

        {/* Contenedor tipo vidrio */}
        <View style={styles.glassContainer}>
          <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.card, { borderColor: item.color }]}
                onPress={() =>
                  navigation.navigate(
                    item.key === 'calculator' || item.key === 'bmi' || item.key === 'age' || item.key === 'discount'
                      ? item.key.charAt(0).toUpperCase() + item.key.slice(1) + 'Screen'
                      : 'UnitConverter',
                    { category: item.key }
                  )
                }
              >
                <Icon name={item.icon} size={32} color={item.color} />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  glassContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    height: 120,
    margin: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
